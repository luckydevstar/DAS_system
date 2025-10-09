-- Users (we’ll manage auth ourselves with bcrypt + JWT)
create table if not exists app_user (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  full_name text not null,
  phone text,
  photo_url text,            -- profile photo (UploadThing URL)
  role text default 'driver',-- admin, driver, etc.
  created_at timestamptz default now()
);

-- Face embeddings per user (one or more; latest is active)
create table if not exists user_face (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_user(id) on delete cascade,
  image_url text not null,            -- stored image (UploadThing/S3)
  embedding jsonb,                    -- store vector/array from your model
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Vehicles: resolved by plate via DVLA API and bound to a user
create table if not exists vehicle (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_user(id) on delete cascade,
  plate text not null,                -- normalized uppercase no spaces
  make text,
  model text,
  color text,
  type text,                          -- car, van, lorry, motorcycle... map from API
  raw jsonb,                          -- full API payload for traceability
  is_verified boolean default false,
  created_at timestamptz default now(),
  unique(user_id, plate)
);

-- A trip/session started by the driver after face verification
create table if not exists trip (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_user(id) on delete cascade,
  vehicle_id uuid references vehicle(id),
  started_at timestamptz not null default now(),
  stopped_at timestamptz,
  status text not null default 'running', -- running | stopped
  created_at timestamptz default now()
);

-- Segments = contiguous spans where (city/postcode, road_type, time_of_day) didn’t change
create table if not exists trip_segment (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trip(id) on delete cascade,
  user_id uuid not null references app_user(id) on delete cascade,
  vehicle_id uuid references vehicle(id),

  -- location features
  city text,
  town text,
  postcode text,
  country text,
  road_ref text,            -- OSM/Google road ref, e.g., "A406", "M25"
  road_type text,           -- MOTORWAY | A | B | OTHER
  time_of_day text,         -- DAY | NIGHT

  -- time bounds for this segment
  started_at timestamptz not null,
  stopped_at timestamptz,

  -- last coordinate we saw in this segment (for map pinning)
  last_lat double precision,
  last_lng double precision,

  created_at timestamptz default now()
);

-- Optional: quick rollups later
create index if not exists idx_trip_segment_user_trip on trip_segment(user_id, trip_id);
create index if not exists idx_trip_segment_location on trip_segment(city, town, postcode);
create index if not exists idx_trip_segment_road on trip_segment(road_type, road_ref);
create index if not exists idx_trip_segment_time on trip_segment(time_of_day, started_at);


-- Duration per segment, derived from trip_segment
create or replace view v_segment_durations as
select
  s.id,
  s.user_id,
  s.vehicle_id,
  s.trip_id,
  s.city, s.town, s.postcode, s.country,
  s.road_ref, s.road_type,        -- MOTORWAY | A | B | OTHER
  s.time_of_day,                  -- DAY | NIGHT
  s.last_lat, s.last_lng,
  s.started_at,
  s.stopped_at,
  greatest(0, extract(epoch from (coalesce(s.stopped_at, now()) - s.started_at)))::int as seconds
from trip_segment s;
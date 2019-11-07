create table users (
  id         serial  not null primary key,
  username   varchar not null unique,
  password   varchar not null,
  first_name varchar,
  last_name  varchar,
  email      varchar unique,
  phone      varchar not null unique,
  enabled    boolean default true,
  role       varchar not null
);

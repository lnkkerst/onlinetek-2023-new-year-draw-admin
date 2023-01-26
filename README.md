# 2023-new-year-draw

2023 new year draw admin

## Prepare

Install dependencies

```bash
pnpm install
```

Only [supabase](https://supabase.com/) database is supported.

```plaintext
                               Table "public.tickets"
   Column    |           Type           | Collation | Nullable |      Default
-------------+--------------------------+-----------+----------+--------------------
 id          | uuid                     |           | not null | uuid_generate_v4()
 name        | text                     |           |          | ''::text
 amount      | bigint                   |           |          | '0'::bigint
 description | text                     |           |          | ''::text
 created_at  | timestamp with time zone |           |          | now()
Indexes:
    "tickets_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "records" CONSTRAINT "records_ticket_fkey" FOREIGN KEY (ticket) REFERENCES tickets(id)
Policies (row security enabled): (none)
```

```plaintext
                              Table "public.records"
   Column   |           Type           | Collation | Nullable |      Default
------------+--------------------------+-----------+----------+--------------------
 visitorId  | text                     |           |          |
 ticket     | uuid                     |           |          |
 created_at | timestamp with time zone |           |          | now()
 redeemed   | boolean                  |           | not null | false
 valid      | boolean                  |           | not null | false
 code       | text                     |           | not null | ''::text
 id         | uuid                     |           | not null | uuid_generate_v4()
Indexes:
    "records_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "records_ticket_fkey" FOREIGN KEY (ticket) REFERENCES tickets(id)
Policies (row security enabled): (none)
```

Add envirionment variables

```dosini
SUPABASE_URL="XXX"
SUPABASE_KEY="XXX"
SUPABASE_SERVICE_KEY="XXX"
```

## Development

```bash
pnpm run dev
```

## Build

```bash
pnpm run build
```

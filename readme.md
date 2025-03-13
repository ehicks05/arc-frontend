# arc-frontend

## Prereqs

1. node

## Getting Started

1. clone repo
2. run:
   ```
   npm i
   npm run start
   ```

## TODO

1. sanitize user-submitted links
2. make app look good
3. finish comment sorting
4. confirm all sort behaviors

# arc-backend

## Prereqs

1. node
2. a supabase project
   - pg_cron extension

## Getting Started

1. clone repo
2. set up a `/.env` file with
   ```
   DATABASE_URL=
   SUPABASE_URL=
   SUPABASE_SERVICE_KEY=
   SUPABASE_JWT_SECRET=
   ```
3. To set up the db schema(s), run
   ```
   npx prisma db dev
   ```
4. to start the app, run:
   ```
   npm i
   npm run generate
   npm run dev
   ```

## Notes

Uses Prisma ORM and nexus

### Scoring

Scores are based on the hacker news algorithm:

```
Score = (P-1) / (T+2)^G

where,
P = points of an item (and -1 is to negate submitters vote)
T = time since submission (in hours)
G = Gravity, defaults to 1.8 in news.arc
```

Currently, we're not subtracting 1 from P, and gravity is 1.5

For more, see
[here](https://medium.com/hacking-and-gonzo/how-hacker-news-ranking-algorithm-works-1d9b0cf2c08d).

In this app, `pg_cron` is used to schedule a task that calls the updatescores()
procedure every few minutes. This keeps scores updated without needed an
external task script.

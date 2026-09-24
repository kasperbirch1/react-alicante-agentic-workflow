-- Each session gets a level so attendees can pick talks that fit them.
-- Same pattern as `session_track`: an enum puts the allowed values in the
-- schema, and `pnpm db:types` generates a union type for them.
--
-- The column is added nullable, backfilled, then set NOT NULL. There is no
-- default: a session with no level assigned should fail the NOT NULL step
-- loudly rather than silently become 'beginner'.
--
-- No grant or policy change: the existing table-level SELECT grant and RLS
-- policies already cover new columns.

-- `create type` has no IF NOT EXISTS, so guard it by hand.
do $$
begin
  if not exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where t.typname = 'session_level'
      and n.nspname = 'public'
  ) then
    create type public.session_level as enum (
      'beginner',
      'intermediate',
      'advanced'
    );
  end if;
end $$;

alter table public.sessions
  add column if not exists level public.session_level;

update public.sessions set level = 'beginner'     where id = 'opening-keynote';
update public.sessions set level = 'intermediate' where id = 'build-your-agentic-workflow';
update public.sessions set level = 'advanced'     where id = 'server-components-deep-dive';
update public.sessions set level = 'intermediate' where id = 'rsc-payload-budget';
update public.sessions set level = 'intermediate' where id = 'agent-context-windows';
update public.sessions set level = 'advanced'     where id = 'micro-frontends-2026';
update public.sessions set level = 'intermediate' where id = 'testing-ai-generated-code';
update public.sessions set level = 'beginner'     where id = 'closing-panel';

alter table public.sessions
  alter column level set not null;

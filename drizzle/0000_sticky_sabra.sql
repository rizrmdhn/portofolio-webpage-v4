CREATE TABLE IF NOT EXISTS "experiences" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"type" text NOT NULL,
	"company" text NOT NULL,
	"date" text NOT NULL,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "page_views" (
	"id" text PRIMARY KEY NOT NULL,
	"count" integer NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"description" text,
	"tech" text[] NOT NULL,
	"image_url" text,
	"github_url" text,
	"url" text,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "experience_id_idx" ON "experiences" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "expereience_name_idx" ON "experiences" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "page_view_id_idx" ON "page_views" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "project_id_idx" ON "projects" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "project_name_idx" ON "projects" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_id_idx" ON "sessions" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "sessions" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_id_idx" ON "users" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_name_idx" ON "users" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
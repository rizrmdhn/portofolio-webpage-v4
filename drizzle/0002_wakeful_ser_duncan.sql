ALTER TABLE "sessions" ADD COLUMN IF NOT EXISTS "ip" text;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN IF NOT EXISTS  "device" text;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN IF NOT EXISTS  "user_agent" text;
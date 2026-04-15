import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, decimal, boolean, index } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * User profiles with onboarding data and preferences
 */
export const profiles = mysqlTable("profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  educationSystem: mysqlEnum("educationSystem", ["11", "12"]),
  targetUniversities: json("targetUniversities").$type<string[]>().default([]),
  programs: json("programs").$type<string[]>().default([]),
  goals: text("goals"),
  interests: json("interests").$type<string[]>().default([]),
  bio: text("bio"),
  languagePreference: mysqlEnum("languagePreference", ["en", "ru"]).default("en"),
  onboardingCompleted: boolean("onboardingCompleted").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdIdx: index("profiles_userId_idx").on(table.userId),
}));

export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = typeof profiles.$inferInsert;

/**
 * University data with requirements and rankings
 */
export const universities = mysqlTable("universities", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  acceptanceRate: decimal("acceptanceRate", { precision: 5, scale: 2 }),
  minGpa: decimal("minGpa", { precision: 3, scale: 2 }),
  minSat: int("minSat"),
  minIelts: decimal("minIelts", { precision: 3, scale: 1 }),
  verifiedSourceUrl: varchar("verifiedSourceUrl", { length: 500 }),
  ranking: int("ranking"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  nameIdx: index("universities_name_idx").on(table.name),
  countryIdx: index("universities_country_idx").on(table.country),
}));

export type University = typeof universities.$inferSelect;
export type InsertUniversity = typeof universities.$inferInsert;

/**
 * Alumni success cases for evidence-based advice
 */
export const alumniCases = mysqlTable("alumniCases", {
  id: int("id").autoincrement().primaryKey(),
  universityId: int("universityId").notNull(),
  studentProfileSummary: text("studentProfileSummary"),
  achievements: json("achievements").$type<string[]>().default([]),
  result: mysqlEnum("result", ["admitted", "scholarship", "waitlisted"]).notNull(),
  gpa: decimal("gpa", { precision: 3, scale: 2 }),
  testScores: json("testScores").$type<Record<string, number>>().default({}),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  universityIdIdx: index("alumniCases_universityId_idx").on(table.universityId),
}));

export type AlumniCase = typeof alumniCases.$inferSelect;
export type InsertAlumniCase = typeof alumniCases.$inferInsert;

/**
 * Chat history for AI assistant conversations
 */
export const chatHistory = mysqlTable("chatHistory", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  messages: json("messages").$type<Array<{ role: string; content: string; timestamp: number }>>().default([]),
  tokensUsed: int("tokensUsed").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdIdx: index("chatHistory_userId_idx").on(table.userId),
}));

export type ChatHistory = typeof chatHistory.$inferSelect;
export type InsertChatHistory = typeof chatHistory.$inferInsert;

/**
 * Daily usage tracking for AI chat limits
 */
export const dailyUsage = mysqlTable("dailyUsage", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  date: varchar("date", { length: 10 }).notNull(),
  messagesUsed: int("messagesUsed").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  userIdDateIdx: index("dailyUsage_userId_date_idx").on(table.userId, table.date),
}));

export type DailyUsage = typeof dailyUsage.$inferSelect;
export type InsertDailyUsage = typeof dailyUsage.$inferInsert;

/**
 * Personal roadmaps with steps and progress
 */
export const roadmaps = mysqlTable("roadmaps", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  steps: json("steps").$type<Array<{
    id: string;
    name: string;
    deadline: number;
    successProof: string;
    completed: boolean;
    order: number;
  }>>().default([]),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdIdx: index("roadmaps_userId_idx").on(table.userId),
}));

export type Roadmap = typeof roadmaps.$inferSelect;
export type InsertRoadmap = typeof roadmaps.$inferInsert;

/**
 * Mentor profiles for the marketplace
 */
export const mentors = mysqlTable("mentors", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  university: varchar("university", { length: 255 }),
  program: varchar("program", { length: 255 }),
  expertise: json("expertise").$type<string[]>().default([]),
  bio: text("bio"),
  yearsOfExperience: int("yearsOfExperience"),
  rating: decimal("rating", { precision: 3, scale: 1 }).default("5.0"),
  isVerified: boolean("isVerified").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index("mentors_userId_idx").on(table.userId),
  universityIdx: index("mentors_university_idx").on(table.university),
}));

export type Mentor = typeof mentors.$inferSelect;
export type InsertMentor = typeof mentors.$inferInsert;

/**
 * Mentor connection requests
 */
export const mentorRequests = mysqlTable("mentorRequests", {
  id: int("id").autoincrement().primaryKey(),
  menteeId: int("menteeId").notNull(),
  mentorId: int("mentorId").notNull(),
  status: mysqlEnum("status", ["pending", "accepted", "rejected", "connected"]).default("pending"),
  message: text("message"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  menteeIdIdx: index("mentorRequests_menteeId_idx").on(table.menteeId),
  mentorIdIdx: index("mentorRequests_mentorId_idx").on(table.mentorId),
}));

export type MentorRequest = typeof mentorRequests.$inferSelect;
export type InsertMentorRequest = typeof mentorRequests.$inferInsert;

/**
 * Relations for foreign keys
 */
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
  chatHistory: many(chatHistory),
  roadmap: one(roadmaps, {
    fields: [users.id],
    references: [roadmaps.userId],
  }),
  mentorProfile: one(mentors, {
    fields: [users.id],
    references: [mentors.userId],
  }),
  menteeRequests: many(mentorRequests, {
    relationName: "menteeRequests",
  }),
  mentorRequests: many(mentorRequests, {
    relationName: "mentorRequests",
  }),
}));

export const universitiesRelations = relations(universities, ({ many }) => ({
  alumniCases: many(alumniCases),
}));

export const alumniCasesRelations = relations(alumniCases, ({ one }) => ({
  university: one(universities, {
    fields: [alumniCases.universityId],
    references: [universities.id],
  }),
}));

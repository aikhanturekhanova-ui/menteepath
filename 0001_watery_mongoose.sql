CREATE TABLE `alumniCases` (
	`id` int AUTO_INCREMENT NOT NULL,
	`universityId` int NOT NULL,
	`studentProfileSummary` text,
	`achievements` json DEFAULT ('[]'),
	`result` enum('admitted','scholarship','waitlisted') NOT NULL,
	`gpa` decimal(3,2),
	`testScores` json DEFAULT ('{}'),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `alumniCases_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chatHistory` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`messages` json DEFAULT ('[]'),
	`tokensUsed` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `chatHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dailyUsage` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`date` varchar(10) NOT NULL,
	`messagesUsed` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `dailyUsage_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mentorRequests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`menteeId` int NOT NULL,
	`mentorId` int NOT NULL,
	`status` enum('pending','accepted','rejected','connected') DEFAULT 'pending',
	`message` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `mentorRequests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mentors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`university` varchar(255),
	`program` varchar(255),
	`expertise` json DEFAULT ('[]'),
	`bio` text,
	`yearsOfExperience` int,
	`rating` decimal(3,1) DEFAULT '5.0',
	`isVerified` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `mentors_id` PRIMARY KEY(`id`),
	CONSTRAINT `mentors_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`educationSystem` enum('11','12'),
	`targetUniversities` json DEFAULT ('[]'),
	`programs` json DEFAULT ('[]'),
	`goals` text,
	`interests` json DEFAULT ('[]'),
	`bio` text,
	`languagePreference` enum('en','ru') DEFAULT 'en',
	`onboardingCompleted` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `profiles_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `roadmaps` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`steps` json DEFAULT ('[]'),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `roadmaps_id` PRIMARY KEY(`id`),
	CONSTRAINT `roadmaps_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `universities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`country` varchar(100) NOT NULL,
	`acceptanceRate` decimal(5,2),
	`minGpa` decimal(3,2),
	`minSat` int,
	`minIelts` decimal(3,1),
	`verifiedSourceUrl` varchar(500),
	`ranking` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `universities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `alumniCases_universityId_idx` ON `alumniCases` (`universityId`);--> statement-breakpoint
CREATE INDEX `chatHistory_userId_idx` ON `chatHistory` (`userId`);--> statement-breakpoint
CREATE INDEX `dailyUsage_userId_date_idx` ON `dailyUsage` (`userId`,`date`);--> statement-breakpoint
CREATE INDEX `mentorRequests_menteeId_idx` ON `mentorRequests` (`menteeId`);--> statement-breakpoint
CREATE INDEX `mentorRequests_mentorId_idx` ON `mentorRequests` (`mentorId`);--> statement-breakpoint
CREATE INDEX `mentors_userId_idx` ON `mentors` (`userId`);--> statement-breakpoint
CREATE INDEX `mentors_university_idx` ON `mentors` (`university`);--> statement-breakpoint
CREATE INDEX `profiles_userId_idx` ON `profiles` (`userId`);--> statement-breakpoint
CREATE INDEX `roadmaps_userId_idx` ON `roadmaps` (`userId`);--> statement-breakpoint
CREATE INDEX `universities_name_idx` ON `universities` (`name`);--> statement-breakpoint
CREATE INDEX `universities_country_idx` ON `universities` (`country`);
# <img src="./public/gdclogo.png" width="36" height="36" alt="GDC Logo" style="vertical-align: middle;" /> Game Dev Club SCTCE Official Website

This repository hosts the official website for the Game Development Club (GDC) at Sree Chitra Thirunal College of Engineering,Thiruvananthapuram. The platform is designed as an interactive portal where club members can track active challenges, play user-submitted games, manage profile loadouts, and monitor their leaderboard ranking.

---

## Architecture and Features

### 1. Profile, XP, and Loadout System
Every member is assigned a public developer dossier displaying level statistics, experience points (XP), and active skill tiers.
* **Familiar Tools:** Users select relevant engines and software (e.g., Unity, Unreal Engine, Blender, Godot) during onboarding.
* **Equippable Loadouts:** Users equip or unequip specific tools in the **Inventory** tab (`/dashboard/inventory`, implemented in [InventoryClient.tsx](src/app/dashboard/inventory/InventoryClient.tsx)). Equipped items display as visual badges on their read-only public profile card (`/dashboard/profile`, implemented in [ProfileClient.tsx](src/app/dashboard/profile/ProfileClient.tsx)).

### 2. The Arcade Wall
A showcase of published games built and uploaded by club members, located at the `/dashboard/arcade` route.
* **Browse Games:** Designed in [ArcadeClient.tsx](src/app/dashboard/arcade/ArcadeClient.tsx) as a horizontal scrollable view. Users navigate the arcade collection via touch scroll or interactive next/previous chevron controls in [GameColumn.tsx](src/app/dashboard/arcade/components/GameColumn.tsx).
* **Details & Ratings:** Selecting a game opens a detail drawer showing description markdown, screenshots, and interactive user ratings.

### 3. Quest Board (Events & Jams)
Quests represent active club challenges, weekly sprints, and hackathons, located at the `/dashboard/quests` route.
* **3D Quest Coverflow:** The landing page features a 3D revolving carousel showcasing current quests, implemented in [ActiveQuestsSection.tsx](src/app/components/home/ActiveQuestsSection.tsx).
* **Registration Flow:** Users view quest descriptions, team size rules, and pricing requirements via [QuestDetailsModal.tsx](src/app/dashboard/quests/components/QuestDetailsModal.tsx).

### 4. Leaderboard
A live club member ranking page located at `/dashboard/leaderboard`. Developers earn XP and rank up through tiers (`Newbie`, `Intermediate`, `Wizard`) by completing quests and submitting game projects.

### 5. Floating Dossier HUD
A persistent shortcut button implemented in [FloatingHUD.tsx](src/components/FloatingHUD.tsx) is anchored in the bottom-right corner of all dashboard layouts for instant navigation to the user profile card.

### 6. Responsive Footer Support Card
The global footer ([Footer.tsx](src/components/Footer.tsx)) includes an interactive "Support" link:
* **Desktop Layout:** Renders as an absolute-positioned tooltip pointing down at the link.
* **Mobile Layout:** Transforms into a centered overlay modal with a dark backdrop dim (`fixed inset-0 bg-black/60`) to accommodate small viewport dimensions.
* Includes click-outside listener to automatically dismiss the popover.

---

## Authentication and Onboarding

The platform utilizes passwordless email OTP (One-Time Password) sessions powered by Supabase. No passwords are stored or managed. The onboarding flow is controlled in [OnboardingClient.tsx](src/app/onboarding/OnboardingClient.tsx).

### Creating an Account
1. Navigate to `/onboarding`.
2. Input registration details: Name, Email, Phone, Roll Number, Year, tools, and experience level.
3. Click **Join the Club** to initiate a 6-digit OTP email verification via `supabase.auth.signInWithOtp`.
4. Enter the code in the verification modal. This verifies the session using `supabase.auth.verifyOtp` and synchronizes the account data via the `syncUserToDatabase` server action.

### Logging In
1. Navigate to `/onboarding` and toggle the form to the **Log In** tab.
2. Enter the registered email address.
3. Click **Send Verification Code** (which verifies account existence via `checkUserExists` and requests an OTP).
4. Enter the verification code to initialize the dashboard session.

---

## Event and Quest Registration

Quests are registered and processed dynamically in [QuestRegistrationFlow.tsx](src/app/dashboard/quests/components/QuestRegistrationFlow.tsx):

1. Navigate to `/dashboard/quests` and open an active quest.
2. **Solo Quests:** Click **Accept Quest** to register instantly.
3. **Team Quests:**
   - Provide a unique **Team Name**.
   - Input teammate emails (teammates must be pre-registered club members on the portal).
4. **Paid Quests:**
   - Scan the dynamically generated UPI QR code to complete the entry payment.
   - Input the **12-digit UPI Reference Number / UTR**.
   - Submit registration. The status is marked as `PENDING APPROVAL` until transaction verification is completed by administrators.

---

## Technology Stack

* **Framework:** Next.js (v16.2.7, App Router) & React (v19.2.4)
* **Styling:** Tailwind CSS (v4.0) with custom variables in `src/app/globals.css`
* **Database & ORM:** Prisma ORM with Postgres database connection
* **Authentication:** Supabase Auth SSR

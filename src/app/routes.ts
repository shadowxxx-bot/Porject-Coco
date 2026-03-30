import { createHashRouter } from "react-router";

// Launch flow
import { LaunchExperience } from "./components/launch/LaunchExperience";
import { RoleSelection } from "./components/launch/RoleSelection";

// Auth
import { SignUp } from "./components/auth/SignUp";

// Co-founder onboarding
import { TellUsAboutYou } from "./components/onboarding/TellUsAboutYou";
import { UploadVideo } from "./components/onboarding/UploadVideo";
import { BuildProfile } from "./components/onboarding/BuildProfile";
import { Experience } from "./components/onboarding/Experience";

// Assessment
import { PersonalityTestIntro } from "./components/assessment/PersonalityTestIntro";
import { TestQuestions } from "./components/assessment/TestQuestions";
import { TestComplete } from "./components/assessment/TestComplete";
import { FounderDnaResults } from "./components/assessment/FounderDnaResults";

// Discovery
import { DiscoveryFeed } from "./components/discover/DiscoveryFeed";
import { ExpandedProfile } from "./components/discover/ExpandedProfile";
import { MatchScreen } from "./components/discover/MatchScreen";
import { MatchesList } from "./components/discover/MatchesList";

// Messaging
import { MessagesScreen } from "./components/messaging/MessagesScreen";
import { ConversationView } from "./components/messaging/ConversationView";

// Profile
import { MyProfile } from "./components/profile/MyProfile";
import { EditProfile } from "./components/profile/EditProfile";

// Events
import { EventsList } from "./components/events/EventsList";
import { EventDetail } from "./components/events/EventDetail";
import { EventCreate } from "./components/events/EventCreate";

// Entrepreneur onboarding
import { EntrepreneurProfile } from "./components/entrepreneur/EntrepreneurProfile";
import { EntrepreneurMotivation } from "./components/entrepreneur/EntrepreneurMotivation";
import { EntrepreneurEngagement } from "./components/entrepreneur/EntrepreneurEngagement";
import { EntrepreneurWorkingStyle } from "./components/entrepreneur/EntrepreneurWorkingStyle";
import { EntrepreneurPreferences } from "./components/entrepreneur/EntrepreneurPreferences";
import { EntrepreneurProject } from "./components/entrepreneur/EntrepreneurProject";

export const router = createHashRouter([
  { path: "/", Component: LaunchExperience },
  { path: "/choose-role", Component: RoleSelection },
  { path: "/signup", Component: SignUp },
  { path: "/about-you", Component: TellUsAboutYou },
  { path: "/upload-video", Component: UploadVideo },
  { path: "/profile", Component: BuildProfile },
  { path: "/experience", Component: Experience },
  { path: "/personality-test", Component: PersonalityTestIntro },
  { path: "/test/:questionId", Component: TestQuestions },
  { path: "/test-complete", Component: TestComplete },
  { path: "/discover", Component: DiscoveryFeed },
  { path: "/profile/:profileId", Component: ExpandedProfile },
  { path: "/match/:profileId", Component: MatchScreen },
  { path: "/matches", Component: MatchesList },
  { path: "/messages", Component: MessagesScreen },
  { path: "/conversation/:conversationId", Component: ConversationView },
  { path: "/my-profile", Component: MyProfile },
  { path: "/edit-profile", Component: EditProfile },
  { path: "/events", Component: EventsList },
  { path: "/events/create", Component: EventCreate },
  { path: "/events/:id", Component: EventDetail },
  { path: "/founder-dna", Component: FounderDnaResults },
  // Entrepreneur onboarding
  { path: "/onboarding/entrepreneur/profile", Component: EntrepreneurProfile },
  { path: "/onboarding/entrepreneur/motivation", Component: EntrepreneurMotivation },
  { path: "/onboarding/entrepreneur/engagement", Component: EntrepreneurEngagement },
  { path: "/onboarding/entrepreneur/workingstyle", Component: EntrepreneurWorkingStyle },
  { path: "/onboarding/entrepreneur/preferences", Component: EntrepreneurPreferences },
  { path: "/onboarding/entrepreneur/project", Component: EntrepreneurProject },
]);

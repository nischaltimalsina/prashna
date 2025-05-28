//@ts-nocheck
"use client"
import React, { useState } from 'react';
import {
  Award,
  Bell,
  Book,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Flame,
  Home,
  MapPin,
  Megaphone,
  MessageCircle,
  Search,
  Settings,
  Shield,
  Star,
  ThumbsUp,
  Trophy,
  User,
  Users
} from 'lucide-react';

// Placeholder avatar component
const Avatar = ({ src, alt, size = "md", className = "" }) => {
  const sizeClass = {
    "xs": "h-6 w-6",
    "sm": "h-8 w-8",
    "md": "h-10 w-10",
    "lg": "h-14 w-14",
    "xl": "h-20 w-20",
  }[size] || "h-10 w-10";

  const initials = alt?.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <div className={`${sizeClass} rounded-full bg-primary/10 text-primary flex items-center justify-center ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="rounded-full" />
      ) : (
        <span className="font-medium">{initials}</span>
      )}
    </div>
  );
};

// Badge component
const Badge = ({ icon, name, description, tier = "bronze", size = "md", earned = true }) => {
  const sizeClass = {
    "sm": "h-8 w-8",
    "md": "h-10 w-10",
    "lg": "h-12 w-12",
  }[size] || "h-10 w-10";

  const tierStyles = {
    "bronze": "border-amber-600/50 bg-amber-50 text-amber-800",
    "silver": "border-gray-400 bg-gray-50 text-gray-700",
    "gold": "border-yellow-500 bg-yellow-50 text-yellow-700"
  }[tier] || "border-amber-600/50 bg-amber-50 text-amber-800";

  return (
    <div className="flex flex-col items-center gap-1" title={description}>
      <div className={`${sizeClass} rounded-full border-2 ${tierStyles} flex items-center justify-center ${!earned ? "opacity-40" : ""}`}>
        {icon}
      </div>
      {name && <span className="text-xs font-medium text-center">{name}</span>}
    </div>
  );
};

// Progress Bar component
const ProgressBar = ({ value, max, color = "primary" }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colorClasses = {
    "primary": "bg-primary",
    "secondary": "bg-green-500",
    "gold": "bg-yellow-500",
    "blue": "bg-blue-500",
  }[color] || "bg-primary";

  return (
    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full ${colorClasses} rounded-full`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

// Main Dashboard Component
export default function GamificationDashboard() {
  const [activeTab, setActiveTab] = useState("top-contributors");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  // Mock user data
  const userData = {
    username: "CivicStar123",
    level: "Advocate",
    impactPoints: 320,
    nextLevelPoints: 500,
    learningPoints: 120,
    nextLearningTier: 200,
    learningTier: "Knowledge Seeker",
    civicStreak: 4,
    learningStreak: 7,
    badges: [
      { id: 1, name: "Civic Novice", description: "Completed 1 Lesson", tier: "bronze", icon: <Book size={16} /> },
      { id: 2, name: "Promise Tracker", description: "Verified 5 Promises", tier: "silver", icon: <CheckCircle size={16} /> },
      { id: 3, name: "Campaign Catalyst", description: "Joined 3 Campaigns", tier: "bronze", icon: <Megaphone size={16} /> },
      { id: 4, name: "Rating Expert", description: "Rated 10 Officials", tier: "silver", icon: <Star size={16} /> },
      { id: 5, name: "Civic Scholar", description: "Completed 5 Civic Lessons", tier: "bronze", icon: <Book size={16} /> },
      { id: 6, name: "Constitution Expert", description: "Passed Constitution Quiz with 100%", tier: "gold", icon: <Award size={16} /> },
    ],
    challenges: [
      { id: 1, name: "Complete 3 quizzes this week", progress: 1, total: 3, points: 30 }
    ],
    achievements: [
      { id: 1, name: "Earned Promise Tracker badge", date: "2025-04-28" },
      { id: 2, name: "Reached Advocate level", date: "2025-04-15" },
      { id: 3, name: "Completed Nepal Constitution module", date: "2025-04-10" }
    ],
    rankings: {
      topContributors: 12,
      civicScholars: 5,
      regional: 3
    }
  };

  // Mock leaderboard data
  const leaderboardData = {
    topContributors: [
      { rank: 1, username: "DemocracyBuilder", points: 1250, badges: ["Civic Legend", "Constitution Expert", "Leaderboard Star"] },
      { rank: 2, username: "NepalAdvocate", points: 980, badges: ["Campaign Legend", "Rating Master"] },
      { rank: 3, username: "CivicChampion", points: 910, badges: ["Learning Expert", "Campaign Catalyst"] },
      { rank: 4, username: "TransparencySeeker", points: 845, badges: ["Promise Tracker", "Rating Expert"] },
      { rank: 5, username: "KathmanduCitizen", points: 780, badges: ["Civic Scholar", "Campaign Catalyst"] },
      { rank: 6, username: "CivicStar123", points: 320, badges: ["Constitution Expert", "Promise Tracker"] },
      { rank: 7, username: "NepalRights", points: 290, badges: ["Civic Novice", "Rating Expert"] },
      { rank: 8, username: "DemocracyWatch", points: 275, badges: ["Campaign Catalyst", "Learning Expert"] },
      { rank: 9, username: "AccountabilityFirst", points: 260, badges: ["Promise Tracker", "Civic Scholar"] },
      { rank: 10, username: "NepaliFuture", points: 240, badges: ["Civic Novice", "Rating Expert"] },
    ],
    civicScholars: [
      { rank: 1, username: "LearningMaster", points: 450, badges: ["Constitution Expert", "Civic Legend"] },
      { rank: 2, username: "KnowledgeSeeker", points: 380, badges: ["Civic Sage", "Learning Expert"] },
      { rank: 3, username: "EducatedCitizen", points: 350, badges: ["Constitution Expert", "Quiz Master"] },
      { rank: 4, username: "LawExpert", points: 340, badges: ["Constitution Expert", "Learning Expert"] },
      { rank: 5, username: "CivicStar123", points: 300, badges: ["Constitution Expert", "Learning Expert"] },
    ],
    activeDistricts: [
      { rank: 1, name: "Kathmandu", points: 12500, progress: 80, target: "District Dynamo" },
      { rank: 2, name: "Lalitpur", points: 8750, progress: 70, target: "Educated Ward" },
      { rank: 3, name: "Pokhara", points: 7500, progress: 60, target: "Engagement Hub" },
      { rank: 4, name: "Bhaktapur", points: 6250, progress: 50, target: "Civic Center" },
      { rank: 5, name: "Bharatpur", points: 5000, progress: 40, target: "Rising Star" },
    ]
  };

  // Mock quiz data
  const quizData = {
    title: "Nepal's Constitution 101",
    currentQuestion: 0,
    questions: [
      {
        id: 1,
        question: "What does Article 16 of the Nepal Constitution guarantee?",
        options: [
          "Right to equality",
          "Right to freedom",
          "Right to live with dignity",
          "Right to freedom of speech"
        ],
        correctAnswer: 2,
        explanation: "Article 16 ensures the right of every person to live with dignity."
      },
      {
        id: 2,
        question: "In what year was the current Constitution of Nepal adopted?",
        options: ["2007", "2013", "2015", "2018"],
        correctAnswer: 2,
        explanation: "Nepal's current constitution was adopted in 2015 (2072 BS)."
      },
      {
        id: 3,
        question: "Which article guarantees the rights of women?",
        options: ["Article 18", "Article 38", "Article 42", "Article 51"],
        correctAnswer: 1,
        explanation: "Article 38 specifically guarantees women's rights in Nepal."
      },
      {
        id: 4,
        question: "How many provinces does Nepal's federal structure have?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 2,
        explanation: "Nepal is divided into 7 provinces according to the 2015 Constitution."
      },
      {
        id: 5,
        question: "Which body interprets the Constitution of Nepal?",
        options: [
          "Supreme Court",
          "Constitutional Court",
          "Constitutional Bench of the Supreme Court",
          "Federal Parliament"
        ],
        correctAnswer: 2,
        explanation: "The Constitutional Bench of the Supreme Court interprets Nepal's Constitution."
      }
    ]
  };

  // Mock learning modules data
  const learningModules = {
    current: {
      title: "Nepal's Constitution 101",
      progress: 2,
      total: 5,
      nextBadge: "Rights Defender"
    },
    completed: 3,
    total: 12
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleStartQuiz = () => {
    setShowQuizModal(true);
  };

  const renderLeaderboard = () => {
    let data = [];
    let title = "";

    switch(activeTab) {
      case "top-contributors":
        data = leaderboardData.topContributors;
        title = "Top Contributors This Week";
        break;
      case "civic-scholars":
        data = leaderboardData.civicScholars;
        title = "Top Civic Scholars This Month";
        break;
      case "active-districts":
        data = leaderboardData.activeDistricts;
        title = "Most Active Districts This Month";
        break;
      default:
        data = leaderboardData.topContributors;
        title = "Top Contributors This Week";
    }

    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <h3 className="font-semibold">{title}</h3>
        </div>

        <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
          {activeTab !== "active-districts" ? (
            // User leaderboard
            data.map(item => (
              <div key={item.rank} className={`p-3 rounded-lg flex items-center gap-3 ${item.username === userData.username ? "bg-blue-50 border border-blue-100" : "bg-gray-50"}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm ${
                  item.rank === 1 ? "bg-yellow-400 text-yellow-800" :
                  item.rank === 2 ? "bg-gray-300 text-gray-700" :
                  item.rank === 3 ? "bg-amber-600 text-amber-50" :
                  "bg-gray-200 text-gray-700"
                }`}>
                  {item.rank}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{item.username}</div>
                  <div className="text-xs text-gray-500">{item.points} Impact Points</div>
                </div>
                <div className="flex gap-1">
                  {item.badges.slice(0, 2).map((badge, idx) => (
                    <div key={idx} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">{badge}</div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            // District leaderboard
            data.map(item => (
              <div key={item.rank} className="p-3 rounded-lg bg-gray-50 flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm ${
                  item.rank === 1 ? "bg-yellow-400 text-yellow-800" :
                  item.rank === 2 ? "bg-gray-300 text-gray-700" :
                  item.rank === 3 ? "bg-amber-600 text-amber-50" :
                  "bg-gray-200 text-gray-700"
                }`}>
                  {item.rank}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.points} Community Points</div>
                  <div className="mt-1">
                    <div className="text-xs mb-1">{item.progress}% to {item.target}</div>
                    <ProgressBar value={item.progress} max={100} color="blue" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1">
          View Full Leaderboard <ChevronRight size={16} />
        </button>

        <div className="mt-6 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
          <div className="flex items-center gap-2 text-sm font-medium text-yellow-800">
            <Star className="h-4 w-4 text-yellow-600" />
            Top 10 earn Leaderboard Star badge!
          </div>
        </div>

        <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 text-sm font-medium text-blue-800">
            <Award className="h-4 w-4 text-blue-600" />
            Kathmandu needs 20 more ratings for Educated Ward badge!
          </div>
        </div>
      </div>
    );
  };

  const ProfileModal = () => {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-t-lg flex flex-col items-center">
            <Avatar size="xl" alt={userData.username} />
            <h2 className="text-xl font-bold mt-3">{userData.username}</h2>
            <div className="flex items-center gap-2 mt-2">
              <Shield className="h-5 w-5" />
              <span className="font-medium">{userData.level}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Star className="h-4 w-4" />
              <span>150 Credibility Score</span>
            </div>
          </div>

          {/* Main content */}
          <div className="p-6">
            {/* Stats overview */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Impact Points</div>
                <div className="font-medium">{userData.impactPoints}/{userData.nextLevelPoints} to next level</div>
                <ProgressBar value={userData.impactPoints} max={userData.nextLevelPoints} color="gold" />
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Learning Points</div>
                <div className="font-medium">{userData.learningPoints}/{userData.nextLearningTier} to Civic Sage</div>
                <ProgressBar value={userData.learningPoints} max={userData.nextLearningTier} color="blue" />
              </div>
            </div>

            {/* Streaks */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 p-4 bg-gray-50 rounded-lg flex items-center gap-3">
                <Flame className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="text-sm text-gray-500">Civic Streak</div>
                  <div className="font-medium">{userData.civicStreak} weeks active</div>
                </div>
              </div>
              <div className="flex-1 p-4 bg-gray-50 rounded-lg flex items-center gap-3">
                <Book className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-sm text-gray-500">Learning Streak</div>
                  <div className="font-medium">{userData.learningStreak} days learning</div>
                </div>
              </div>
            </div>

            {/* Badges gallery */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Badges Earned (15)</h3>
              <div className="grid grid-cols-4 gap-4">
                {userData.badges.map(badge => (
                  <Badge
                    key={badge.id}
                    icon={badge.icon}
                    name={badge.name}
                    description={badge.description}
                    tier={badge.tier}
                    size="lg"
                  />
                ))}
                {/* Example of locked badge */}
                <Badge
                  icon={<Trophy size={16} />}
                  name="Civic Legend"
                  description="Reach 5,000 points"
                  tier="gold"
                  size="lg"
                  earned={false}
                />
                <Badge
                  icon={<Award size={16} />}
                  name="Master Rater"
                  description="Rate 50 officials"
                  tier="gold"
                  size="lg"
                  earned={false}
                />
              </div>
            </div>

            {/* Achievements timeline */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Recent Achievements</h3>
              <div className="border-l-2 border-blue-200 pl-4 space-y-4">
                {userData.achievements.map(achievement => (
                  <div key={achievement.id} className="relative">
                    <div className="absolute -left-6 top-0 w-3 h-3 rounded-full bg-blue-500"></div>
                    <div className="text-sm font-medium">{achievement.name}</div>
                    <div className="text-xs text-gray-500">{new Date(achievement.date).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard rankings */}
            <div className="p-4 bg-gray-50 rounded-lg mb-6">
              <h3 className="font-semibold mb-3">Your Rankings</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Top Contributors</span>
                  <span className="font-medium">#{userData.rankings.topContributors}</span>
                </div>
                <div className="flex justify-between">
                  <span>Civic Scholars</span>
                  <span className="font-medium">#{userData.rankings.civicScholars}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kathmandu Region</span>
                  <span className="font-medium">#{userData.rankings.regional}</span>
                </div>
              </div>
            </div>

            {/* Share options */}
            <div className="flex gap-3">
              <button className="flex-1 bg-blue-500 text-white rounded-lg py-2 px-4 flex items-center justify-center gap-2">
                <ExternalLink size={16} />
                Share Profile
              </button>
              <button className="flex-1 bg-green-500 text-white rounded-lg py-2 px-4 flex items-center justify-center gap-2">
                <Award size={16} />
                Share Badge
              </button>
            </div>
          </div>

          <div className="p-4 border-t flex justify-end">
            <button
              onClick={() => setShowProfileModal(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const QuizModal = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const question = quizData.questions[currentQuestion];

    const handleAnswerSelect = (index) => {
      if (isAnswered) return;
      setSelectedAnswer(index);
    };

    const handleSubmitAnswer = () => {
      if (selectedAnswer === null) return;
      setIsAnswered(true);

      // If on last question, show result
      if (currentQuestion === quizData.questions.length - 1) {
        setTimeout(() => {
          setShowResult(true);
        }, 1500);
      }
    };

    const handleNextQuestion = () => {
      if (currentQuestion < quizData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      }
    };

    if (showResult) {
      return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Quiz Completed!</h3>
            <p className="text-gray-600 mb-4">
              You earned 20 points and the Quiz Master badge!
            </p>
            <div className="flex flex-col gap-3 mt-6">
              <button className="w-full bg-blue-500 text-white rounded-lg py-2 px-4 flex items-center justify-center gap-2">
                <ExternalLink size={16} />
                Share Achievement
              </button>
              <button
                onClick={() => {
                  setShowQuizModal(false);
                  setShowResult(false);
                }}
                className="w-full bg-gray-200 hover:bg-gray-300 rounded-lg py-2 px-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">{quizData.title}</h3>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Question {currentQuestion + 1} of {quizData.questions.length}</span>
                <span>+10 points for passing</span>
              </div>
              <ProgressBar
                value={currentQuestion + 1}
                max={quizData.questions.length}
                color="blue"
              />
            </div>

            {/* Question */}
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-4">{question.question}</h4>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`p-3 border rounded-lg cursor-pointer ${
                      selectedAnswer === index
                        ? isAnswered
                          ? index === question.correctAnswer
                            ? "border-green-500 bg-green-50"
                            : "border-red-500 bg-red-50"
                          : "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback when answered */}
            {isAnswered && (
              <div className={`p-4 rounded-lg mb-6 ${
                selectedAnswer === question.correctAnswer
                  ? "bg-green-50 border border-green-100"
                  : "bg-red-50 border border-red-100"
              }`}>
                <div className={`font-medium ${
                  selectedAnswer === question.correctAnswer
                    ? "text-green-700"
                    : "text-red-700"
                }`}>
                  {selectedAnswer === question.correctAnswer ? "Correct!" : "Incorrect!"}
                </div>
                <p className="text-gray-600 mt-1">{question.explanation}</p>
              </div>
            )}

            <div className="flex justify-end gap-3">
              {!isAnswered ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className={`px-4 py-2 rounded-lg ${
                    selectedAnswer === null
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  {currentQuestion < quizData.questions.length - 1 ? "Next Question" : "See Results"}
                </button>
              )}
            </div>
          </div>

          <div className="p-4 border-t flex justify-start">
            <button
              onClick={() => setShowQuizModal(false)}
              className="px-4 py-2 text-gray-500 hover:text-gray-700"
            >
              Exit Quiz
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showProfileModal && <ProfileModal />}
      {showQuizModal && <QuizModal />}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">PledgePoint</div>
            <nav className="hidden md:flex items-center gap-6 text-sm ml-10">
              <a href="#" className="flex items-center gap-1 text-blue-600 font-medium">
                <Home size={18} />
                Home
              </a>
              <a href="#" className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                <ThumbsUp size={18} />
                Rate Officials
              </a>
              <a href="#" className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                <CheckCircle size={18} />
                Track Promises
              </a>
              <a href="#" className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                <Megaphone size={18} />
                Campaigns
              </a>
              <a href="#" className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                <Book size={18} />
                Learning Hub
              </a>
              <a href="#" className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                <MessageCircle size={18} />
                Ask an Expert
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200">
              <Search size={16} />
            </button>
            <div className="relative">
              <button className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200">
                <Settings size={16} />
              </button>
            </div>
            <div className="relative">
              <div className="h-5 w-5 absolute -top-1 -right-1 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">2</div>
              <button className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200">
                <Bell size={16} />
              </button>
            </div>
            <button
              onClick={() => setShowProfileModal(true)}
              className="flex items-center gap-2 text-sm font-medium"
            >
              <Avatar size="sm" alt={userData.username} />
              <span className="hidden md:inline">{userData.username}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-500 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Track Promises, Hold Leaders Accountable</h1>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-lg">
            Explore Your Dashboard
          </button>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="bg-white/20 rounded-lg px-4 py-2 inline-flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="font-medium">{userData.level}</span>
              <span>•</span>
              <span>{userData.impactPoints}/{userData.nextLevelPoints} to Leader</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Progress (Left Column) */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar size="lg" alt={userData.username} />
                <div>
                  <h2 className="font-bold">{userData.username}</h2>
                  <div className="flex items-center text-sm text-gray-500 gap-1">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span>{userData.level}</span>
                  </div>
                </div>
              </div>

              {/* Impact Points */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Impact Points</span>
                  <span className="font-medium">{userData.impactPoints}/{userData.nextLevelPoints}</span>
                </div>
                <ProgressBar value={userData.impactPoints} max={userData.nextLevelPoints} color="primary" />
              </div>

              {/* Learning Sub-Tier */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <div className="flex items-center gap-1">
                    <Book className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-500">{userData.learningTier}</span>
                  </div>
                  <span className="font-medium">{userData.learningPoints}/{userData.nextLearningTier}</span>
                </div>
                <ProgressBar value={userData.learningPoints} max={userData.nextLearningTier} color="blue" />
              </div>

              {/* Badges Showcase */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Badges</h3>
                  <button className="text-sm text-blue-600">View All</button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {userData.badges.slice(0, 6).map(badge => (
                    <Badge
                      key={badge.id}
                      icon={badge.icon}
                      name={badge.name}
                      description={badge.description}
                      tier={badge.tier}
                    />
                  ))}
                </div>
              </div>

              {/* Streaks */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 bg-orange-50 rounded-lg p-3 flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <div>
                    <div className="text-xs text-gray-500">Civic Streak</div>
                    <div className="font-medium">{userData.civicStreak} weeks</div>
                  </div>
                </div>
                <div className="flex-1 bg-blue-50 rounded-lg p-3 flex items-center gap-2">
                  <Book className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-xs text-gray-500">Learning Streak</div>
                    <div className="font-medium">{userData.learningStreak} days</div>
                  </div>
                </div>
              </div>

              {/* Active Challenge */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <h3 className="font-medium text-green-800 mb-2">Weekly Challenge</h3>
                <p className="text-sm text-green-700 mb-3">
                  Complete 3 quizzes this week for 30 points!
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="font-medium">1/3</span> quizzes done
                  </div>
                  <button
                    onClick={handleStartQuiz}
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg"
                  >
                    Start Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboards (Center Column) */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="border-b">
                <div className="flex">
                  <button
                    onClick={() => handleTabChange("top-contributors")}
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === "top-contributors"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Top Contributors
                  </button>
                  <button
                    onClick={() => handleTabChange("civic-scholars")}
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === "civic-scholars"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Civic Scholars
                  </button>
                  <button
                    onClick={() => handleTabChange("active-districts")}
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === "active-districts"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Active Districts
                  </button>
                </div>
              </div>

              <div className="p-4">
                {renderLeaderboard()}
              </div>
            </div>
          </div>

          {/* Quick Actions (Right Column) */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-3">
                <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-3 rounded-lg font-medium flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5" />
                  Rate an Official
                </button>
                <button className="bg-green-50 hover:bg-green-100 text-green-700 p-3 rounded-lg font-medium flex items-center gap-2">
                  <Megaphone className="h-5 w-5" />
                  Join a Campaign
                </button>
                <button
                  onClick={handleStartQuiz}
                  className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 p-3 rounded-lg font-medium flex items-center gap-2"
                >
                  <Book className="h-5 w-5" />
                  Take a Quiz
                </button>
                <button className="bg-purple-50 hover:bg-purple-100 text-purple-700 p-3 rounded-lg font-medium flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Ask an Expert
                </button>
              </div>
            </div>

            {/* Civic Learning Hub Card */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-blue-600 text-white p-4">
                <h3 className="font-bold">Civic Learning Hub: Know Your Rights</h3>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Nepal's Constitution 101</span>
                    <span>{learningModules.current.progress}/{learningModules.current.total} lessons done</span>
                  </div>
                  <ProgressBar value={learningModules.current.progress} max={learningModules.current.total} color="blue" />
                </div>
                <div className="flex items-center gap-2 text-sm mb-4">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span>Earn {learningModules.current.nextBadge} badge</span>
                </div>
                <button
                  onClick={handleStartQuiz}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg font-medium"
                >
                  Take a Quiz
                </button>
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium mb-3">Kathmandu Community</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Ratings Submitted</span>
                    <span className="font-medium">847</span>
                  </div>
                  <ProgressBar value={847} max={1000} color="secondary" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Campaign Participants</span>
                    <span className="font-medium">326</span>
                  </div>
                  <ProgressBar value={326} max={500} color="secondary" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Quiz Completions</span>
                    <span className="font-medium">502</span>
                  </div>
                  <ProgressBar value={502} max={1000} color="secondary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="font-bold text-lg bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">PledgePoint</div>
              <div className="text-sm text-gray-500">Empowering citizens, strengthening democracy</div>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600">Community Guidelines</a>
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600">Partners</a>
            </div>
            <div className="mt-4 md:mt-0 flex gap-4">
              <a href="#" className="h-8 w-8 rounded-full bg-gray-200 hover:bg-blue-100 flex items-center justify-center">
                <svg className="h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-gray-200 hover:bg-green-100 flex items-center justify-center">
                <svg className="h-4 w-4 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.247 3.088a8.1 8.1 0 0 0-3.414-1.067c-.29.492-.555 1.125-.748 1.645-2.57-.39-5.131-.39-7.7 0a17.042 17.042 0 0 0-.748-1.646 8.1 8.1 0 0 0-3.414 1.068C.588 8.915-.365 14.572.115 20.152a8.155 8.155 0 0 0 2.5 1.833c.306-.406.582-.839.824-1.292a.078.078 0 0 0-.041-.109 19.522 19.522 0 0 1-1.689-.801.08.08 0 0 1-.008-.133c.114-.084.227-.172.335-.26a5.783 5.783 0 0 0 5.006.293 14.916 14.916 0 0 1-1.826-.875.077.077 0 0 1-.034-.107 14.103 14.103 0 0 0 .527-.42.077.077 0 0 1 .081-.011c5.007 2.319 10.434 2.319 15.391 0a.077.077 0 0 1 .05-.015c.18.143.36.283.528.422a.077.077 0 0 1-.033.106c-.58.343-1.19.634-1.826.875a5.785 5.785 0 0 0 5.008-.293l.334.26a.08.08 0 0 1-.008.133c-.545.317-1.113.585-1.687.8a.078.078 0 0 0-.043.11 15.1 15.1 0 0 0 .825 1.291A8.125 8.125 0 0 0 23.88 20.15c.563-6.512-1.188-12.119-3.633-17.064z"/>
                </svg>
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-gray-200 hover:bg-blue-100 flex items-center justify-center">
                <svg className="h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.063 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

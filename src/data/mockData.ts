export interface Campaign {
  id: string
  title: string
  story: string
  category: string
  fundingGoal: number
  minContribution: number
  deadline: string
  rewardInfo: string
  imageUrl: string
  creatorName: string
  creatorEmail: string
  status: 'pending' | 'approved' | 'rejected'
  amountRaised: number
  createdAt: string
}

export interface Contribution {
  id: string
  campaignId: string
  campaignTitle: string
  contributionAmount: number
  supporterEmail: string
  supporterName: string
  creatorName: string
  creatorEmail: string
  currentDate: string
  status: 'pending' | 'approved' | 'rejected'
  message?: string
}

export interface Withdrawal {
  id: string
  creatorEmail: string
  creatorName: string
  withdrawalCredit: number
  withdrawalAmount: number
  paymentSystem: string
  accountNumber: string
  withdrawDate: string
  status: 'pending' | 'approved'
}

export interface Payment {
  id: string
  userEmail: string
  credits: number
  amount: number
  date: string
  method: string
}

export interface Notification {
  id: string
  message: string
  toEmail: string
  actionRoute: string
  time: string
  read: boolean
}

export interface Report {
  id: string
  reporterName: string
  reporterEmail: string
  campaignId: string
  campaignTitle: string
  reason: string
  date: string
  status: 'open' | 'resolved'
}

export const mockCampaigns: Campaign[] = [
  {
    id: 'c1',
    title: 'Solar-Powered Clean Water for Rural Kenya',
    story: 'We\'re deploying a network of solar-powered water pumps across 12 rural villages in Kenya. Each pump provides clean drinking water to 400+ residents and runs entirely on renewable energy. This project will eliminate a 3-hour daily walk for water that thousands of women and children currently make.',
    category: 'Community',
    fundingGoal: 5000,
    minContribution: 10,
    deadline: '2025-09-30',
    rewardInfo: 'Backers get a personalized thank-you video from the community, project updates, and a certificate of impact.',
    imageUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&h=400&fit=crop',
    creatorName: 'Alex Rivera',
    creatorEmail: 'creator@fundrise.io',
    status: 'approved',
    amountRaised: 3820,
    createdAt: '2025-07-01',
  },
  {
    id: 'c2',
    title: 'Open-Source AI Music Composition Tool',
    story: 'We\'re building a free, open-source AI tool that helps independent musicians compose original scores. Unlike proprietary tools, ours will be fully transparent, locally-run, and community-governed. No subscription fees, no data harvesting.',
    category: 'Technology',
    fundingGoal: 3000,
    minContribution: 5,
    deadline: '2025-10-15',
    rewardInfo: 'Early supporters get lifetime access, a custom AI-generated track, and your name in the credits.',
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop',
    creatorName: 'Alex Rivera',
    creatorEmail: 'creator@fundrise.io',
    status: 'approved',
    amountRaised: 1250,
    createdAt: '2025-07-05',
  },
  {
    id: 'c3',
    title: 'Graphic Novel: The Last Cartographer',
    story: 'A 300-page full-color graphic novel following the final mapmaker in a post-GPS world. Illustrated by hand, this story blends speculative fiction with deep themes about knowledge, memory, and human connection. Each page is a work of art.',
    category: 'Art',
    fundingGoal: 2000,
    minContribution: 15,
    deadline: '2025-08-31',
    rewardInfo: 'Signed print copy, digital edition, original sketch prints for top backers.',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=400&fit=crop',
    creatorName: 'Alex Rivera',
    creatorEmail: 'creator@fundrise.io',
    status: 'approved',
    amountRaised: 1890,
    createdAt: '2025-06-20',
  },
  {
    id: 'c4',
    title: 'Mobile Mental Health Clinic for Underserved Communities',
    story: 'A fully-equipped mobile clinic staffed by licensed therapists will visit underserved neighborhoods twice weekly. We\'ll provide free counseling, crisis support, and psychiatric referrals to people who can\'t afford or access traditional mental health care.',
    category: 'Health',
    fundingGoal: 8000,
    minContribution: 20,
    deadline: '2025-11-01',
    rewardInfo: 'Receive quarterly impact reports, a mental health resource guide, and recognition as a founding supporter.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
    creatorName: 'Morgan Chen',
    creatorEmail: 'morgan@example.com',
    status: 'approved',
    amountRaised: 4600,
    createdAt: '2025-07-08',
  },
  {
    id: 'c5',
    title: 'Vertical Farm in Urban Food Deserts',
    story: 'We\'re converting vacant lots in 3 food-desert neighborhoods into vertical hydroponic farms. Each farm produces 2,000+ lbs of fresh produce monthly, sold at below-market rates to local residents. All proceeds fund expansion to the next neighborhood.',
    category: 'Community',
    fundingGoal: 6000,
    minContribution: 10,
    deadline: '2025-09-15',
    rewardInfo: 'Monthly produce boxes for premium supporters. Community naming rights for top-tier backers.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
    creatorName: 'Sam Okoye',
    creatorEmail: 'sam@example.com',
    status: 'approved',
    amountRaised: 5100,
    createdAt: '2025-06-28',
  },
  {
    id: 'c6',
    title: 'Handcrafted Mechanical Keyboard Artisan Keycaps',
    story: 'Each keycap is hand-sculpted by master artisans using polymer clay, featuring original fantasy and sci-fi designs. Limited to 200 sets worldwide. Includes a signature storage case and numbered certificate of authenticity.',
    category: 'Art',
    fundingGoal: 1500,
    minContribution: 30,
    deadline: '2025-08-20',
    rewardInfo: 'Full set of 20 artisan keycaps, storage case, and certificate. Top backers get a custom commissioned design.',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=400&fit=crop',
    creatorName: 'Yuki Tanaka',
    creatorEmail: 'yuki@example.com',
    status: 'approved',
    amountRaised: 1420,
    createdAt: '2025-07-10',
  },
  {
    id: 'c7',
    title: 'Documentary: Hidden Lives of Deep-Sea Creatures',
    story: 'A 90-minute nature documentary exploring bioluminescent organisms 3,000 meters below the Pacific Ocean. Shot with cutting-edge deep-sea cameras, narrated by marine biologist Dr. Priya Mehta. Targeting major streaming platform distribution.',
    category: 'Technology',
    fundingGoal: 12000,
    minContribution: 25,
    deadline: '2025-10-30',
    rewardInfo: 'Early streaming access, behind-the-scenes footage, and producer credits for major backers.',
    imageUrl: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=600&h=400&fit=crop',
    creatorName: 'Priya Mehta',
    creatorEmail: 'priya@example.com',
    status: 'pending',
    amountRaised: 0,
    createdAt: '2025-07-12',
  },
  {
    id: 'c8',
    title: 'STEM Summer Camp for Girls in Rural Appalachia',
    story: 'A 6-week residential STEM camp for 80 girls aged 12-17 from rural Appalachian communities. Focus areas: robotics, environmental science, coding, and entrepreneurship. Full scholarships for all participants.',
    category: 'Community',
    fundingGoal: 4500,
    minContribution: 10,
    deadline: '2025-07-31',
    rewardInfo: 'Annual impact report, personalized thank-you from a camper, and naming opportunity for top supporters.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
    creatorName: 'Diana Osei',
    creatorEmail: 'diana@example.com',
    status: 'approved',
    amountRaised: 3900,
    createdAt: '2025-06-15',
  },
]

export const mockContributions: Contribution[] = [
  {
    id: 'contrib1',
    campaignId: 'c1',
    campaignTitle: 'Solar-Powered Clean Water for Rural Kenya',
    contributionAmount: 100,
    supporterEmail: 'supporter@fundrise.io',
    supporterName: 'Jordan Kim',
    creatorName: 'Alex Rivera',
    creatorEmail: 'creator@fundrise.io',
    currentDate: '2025-07-05',
    status: 'approved',
    message: 'This is an incredible initiative. Keep up the amazing work!',
  },
  {
    id: 'contrib2',
    campaignId: 'c2',
    campaignTitle: 'Open-Source AI Music Composition Tool',
    contributionAmount: 50,
    supporterEmail: 'supporter@fundrise.io',
    supporterName: 'Jordan Kim',
    creatorName: 'Alex Rivera',
    creatorEmail: 'creator@fundrise.io',
    currentDate: '2025-07-08',
    status: 'pending',
    message: 'Love open source projects! Best of luck.',
  },
  {
    id: 'contrib3',
    campaignId: 'c3',
    campaignTitle: 'Graphic Novel: The Last Cartographer',
    contributionAmount: 75,
    supporterEmail: 'supporter@fundrise.io',
    supporterName: 'Jordan Kim',
    creatorName: 'Alex Rivera',
    creatorEmail: 'creator@fundrise.io',
    currentDate: '2025-07-10',
    status: 'approved',
  },
  {
    id: 'contrib4',
    campaignId: 'c1',
    campaignTitle: 'Solar-Powered Clean Water for Rural Kenya',
    contributionAmount: 200,
    supporterEmail: 'backer2@example.com',
    supporterName: 'Elena Santos',
    creatorName: 'Alex Rivera',
    creatorEmail: 'creator@fundrise.io',
    currentDate: '2025-07-06',
    status: 'pending',
    message: 'Supporting this from the bottom of my heart.',
  },
  {
    id: 'contrib5',
    campaignId: 'c2',
    campaignTitle: 'Open-Source AI Music Composition Tool',
    contributionAmount: 150,
    supporterEmail: 'backer3@example.com',
    supporterName: 'Marcus Webb',
    creatorName: 'Alex Rivera',
    creatorEmail: 'creator@fundrise.io',
    currentDate: '2025-07-09',
    status: 'pending',
  },
]

export const mockWithdrawals: Withdrawal[] = [
  {
    id: 'w1',
    creatorEmail: 'creator@fundrise.io',
    creatorName: 'Alex Rivera',
    withdrawalCredit: 500,
    withdrawalAmount: 25,
    paymentSystem: 'Stripe',
    accountNumber: '****4242',
    withdrawDate: '2025-07-01',
    status: 'approved',
  },
  {
    id: 'w2',
    creatorEmail: 'creator@fundrise.io',
    creatorName: 'Alex Rivera',
    withdrawalCredit: 300,
    withdrawalAmount: 15,
    paymentSystem: 'Stripe',
    accountNumber: '****4242',
    withdrawDate: '2025-07-10',
    status: 'pending',
  },
]

export const mockPayments: Payment[] = [
  { id: 'p1', userEmail: 'supporter@fundrise.io', credits: 300, amount: 25, date: '2025-07-01', method: 'Stripe' },
  { id: 'p2', userEmail: 'supporter@fundrise.io', credits: 100, amount: 10, date: '2025-06-20', method: 'Stripe' },
  { id: 'p3', userEmail: 'backer2@example.com', credits: 800, amount: 60, date: '2025-07-05', method: 'Stripe' },
]

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    message: 'Your contribution of 100 credits to Solar-Powered Clean Water for Rural Kenya was approved by Alex Rivera',
    toEmail: 'supporter@fundrise.io',
    actionRoute: '/dashboard/supporter-home',
    time: '2025-07-06T10:30:00Z',
    read: false,
  },
  {
    id: 'n2',
    message: 'Your contribution of 75 credits to Graphic Novel: The Last Cartographer was approved by Alex Rivera',
    toEmail: 'supporter@fundrise.io',
    actionRoute: '/dashboard/supporter-home',
    time: '2025-07-11T14:00:00Z',
    read: false,
  },
  {
    id: 'n3',
    message: 'Jordan Kim made a contribution of 100 credits to your campaign Solar-Powered Clean Water for Rural Kenya',
    toEmail: 'creator@fundrise.io',
    actionRoute: '/dashboard/creator-home',
    time: '2025-07-05T09:00:00Z',
    read: true,
  },
  {
    id: 'n4',
    message: 'Your withdrawal request of $15 was approved by Admin',
    toEmail: 'creator@fundrise.io',
    actionRoute: '/dashboard/withdrawals',
    time: '2025-07-02T11:00:00Z',
    read: true,
  },
]

export const mockReports: Report[] = [
  {
    id: 'r1',
    reporterName: 'Jordan Kim',
    reporterEmail: 'supporter@fundrise.io',
    campaignId: 'c6',
    campaignTitle: 'Handcrafted Mechanical Keyboard Artisan Keycaps',
    reason: 'Campaign images appear to be stock photos rather than actual products. No proof of prior work.',
    date: '2025-07-11',
    status: 'open',
  },
]

export const mockUsers = [
  { id: '1', name: 'Admin User', email: 'admin@fundrise.io', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', role: 'admin', credits: 1000 },
  { id: '2', name: 'Alex Rivera', email: 'creator@fundrise.io', photoUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop', role: 'creator', credits: 20 },
  { id: '3', name: 'Jordan Kim', email: 'supporter@fundrise.io', photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', role: 'supporter', credits: 350 },
  { id: '4', name: 'Elena Santos', email: 'backer2@example.com', photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', role: 'supporter', credits: 120 },
  { id: '5', name: 'Marcus Webb', email: 'backer3@example.com', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', role: 'supporter', credits: 200 },
  { id: '6', name: 'Morgan Chen', email: 'morgan@example.com', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', role: 'creator', credits: 40 },
  { id: '7', name: 'Sam Okoye', email: 'sam@example.com', photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop', role: 'creator', credits: 15 },
]

const Landingdata = {
    section: "LandingPage",
    data: {
        greeting: "Hi, I’m Nugi",
        role: "Web3 Developer & Blockchain Engineer",
        description: " I design and build decentralized applications (dApps) and secure smart contracts  with a strong focus on scalability, security, and on-chain efficiency.   My expertise spans DeFi protocols, blockchain architecture, and seamlessWeb3 integrations that bridge user experience with trustless systems.",
        profilePicture: "/profile.jpg",
        navigation: [
            { name: 'Projects', href: '#projects' },
            { name: 'About Me', href: '#about' },
            { name: 'Contact', href: '#contact' },
        ],
        }
}

const ProjectsData = {
    section: "ProjectsPage",
    data: [
            {
                title: 'DeFi Lending Protocol',
                image:
                    'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200&auto=format&fit=crop',
                short: 'Decentralized lending and borrowing protocol.',
                details:
                    'Built with Solidity and Hardhat. Includes collateral logic, liquidation engine, and Chainlink oracle integration.',
                link: 'https://your-defi-project.com',
            },
            {
                title: 'NFT Marketplace',
                image:
                    'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=1200&auto=format&fit=crop',
                short: 'Gas-optimized NFT minting and trading platform.',
                details:
                    'ERC-721 + ERC-2981 royalty support with IPFS metadata and wallet authentication.',
                link: 'https://your-nft-marketplace.com',
            },
            {
                title: 'DAO Governance',
                image:
                    'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop',
                short: 'On-chain governance with proposal & voting.',
                details:
                    'Token-weighted voting, quorum validation & timelock execution.',
                link: 'https://your-dao-app.com',
            },
            {
                title: 'Web3 Wallet Dashboard',
                image:
                    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
                short: 'Multi-chain wallet analytics dashboard.',
                details:
                    'Aggregates EVM chains, tracks balances & DeFi positions.',
                link: 'https://your-wallet-dashboard.com',
            },
    ]
}

const AboutMeData = {
    subTitle: "Web3 Developer focused on building secure, scalable, and efficient decentralized applications.",
    whoIam: "I specialize in smart contract engineering and decentralized system architecture. My development philosophy emphasizes security-first design, gas optimization, and seamless Web3 UX.",
    experience: "3+ Years Experience",
    projects: "20+ Projects Completed",
        skills: [
        { name: 'Solidity', level: 80 },
        { name: 'Ethers.js / Wagmi', level: 85 },
        { name: 'Next.js & React', level: 88 },
        { name: 'Smart Contract Security', level: 80 },
        { name: 'DeFi Architecture', level: 85 },
        { name: 'Node.js', level: 75 },
    ]
}

const FooterData = {
    title: "Connect with me",
    socialLinks: [
        { name: "GitHub", url: "https://github.com/nugi32" },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/nugroho-adhipratama-28b973394/" },
        { name: "gmail", url: "https://nugrohoadhipratama135@gmail.com" },
    ]
}

const exportedData = {
    Landingdata,
    ProjectsData,
    AboutMeData,
    FooterData
}

export default exportedData;
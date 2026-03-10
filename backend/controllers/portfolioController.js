const Landing = require("../models/landing");
const Project = require("../models/project");
const About = require("../models/about");
const Footer = require("../models/footer");

// Save entire portfolio data
exports.savePortfolio = async (req, res) => {
  try {
    const portfolioData = req.body;
    if (!portfolioData) {
      return res.status(400).json({ message: "No data provided" });
    }

    // 1. Save Landing Data
    if (portfolioData.landing) {
      // log payload to see what arrived (helps debug missing values)
      console.log("[portfolioController] landing payload:", portfolioData.landing);

      const landingData = {
        greeting: portfolioData.landing.greeting,
        role: portfolioData.landing.role,
        description: portfolioData.landing.description,
        profilePicture: portfolioData.landing.profilePicture // Use URL from payload
      };

      // Upsert (update if exists, create if not).
      // Important: if there are multiple landing documents in the collection,
      // findOneAndUpdate with an empty filter `{}` will pick an *arbitrary* document.
      // The GET endpoint sorts by createdAt desc and returns the newest record, so
      // we must use the same sort when updating to ensure we modify the same
      // document that the admin page will read back.  Without the sort the
      // user could be editing an old record while the newest one remains unchanged.
      await Landing.findOneAndUpdate({}, landingData, {
        upsert: true,
        sort: { createdAt: -1 }
      });
    }

    // 2. Save Projects Data
    if (portfolioData.projects) {
      // Delete all existing projects
      await Project.deleteMany({});

      // Create new projects
      for (let i = 0; i < portfolioData.projects.length; i++) {
        const projectItem = portfolioData.projects[i];
        const projectData = {
          title: projectItem.title,
          short: projectItem.short,
          details: projectItem.details,
          link: projectItem.link,
          image: projectItem.image // Use URL from payload
        };

        await Project.create(projectData);
      }
    }

    // 3. Save About Data
    if (portfolioData.about) {
      const aboutData = {
        subTitle: portfolioData.about.subTitle,
        whoIam: portfolioData.about.whoIam,
        experience: portfolioData.about.experience,
        projects: portfolioData.about.projects,
        skills: portfolioData.about.skills || []
      };

      // keep same semantics as landing; pick the most recently created document
      await About.findOneAndUpdate({}, aboutData, {
        upsert: true,
        sort: { createdAt: -1 }
      });
    }

    // 4. Save Footer Data
    if (portfolioData.footer) {
      const footerData = {
        title: portfolioData.footer.title,
        socialLinks: portfolioData.footer.socialLinks || []
      };

      // pick newest footer entry when multiple exist
      await Footer.findOneAndUpdate({}, footerData, {
        upsert: true,
        sort: { createdAt: -1 }
      });
    }

    res.json({ message: "Portfolio saved successfully" });
  } catch (error) {
    console.error("Save portfolio error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get entire portfolio data
exports.getPortfolio = async (req, res) => {
  try {
    const landing = await Landing.findOne();
    const projects = await Project.find().sort({ createdAt: -1 });
    const about = await About.findOne();
    const footer = await Footer.findOne();

    res.json({
      Landingdata: {
        section: "LandingPage",
        data: landing || {}
      },
      ProjectsData: {
        section: "ProjectsPage",
        data: projects || []
      },
      AboutMeData: about || {},
      FooterData: footer || {}
    });
  } catch (error) {
    console.error("Get portfolio error:", error);
    res.status(500).json({ message: error.message });
  }
};

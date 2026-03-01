const Landing = require("../models/landing");
const Project = require("../models/project");
const About = require("../models/about");
const Footer = require("../models/footer");
const fs = require("fs");
const path = require("path");

// Save entire portfolio data
exports.savePortfolio = async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ message: "No data provided" });
    }

    const portfolioData = JSON.parse(data);

    // 1. Save Landing Data
    if (portfolioData.Landingdata) {
      const landingData = {
        greeting: portfolioData.Landingdata.data.greeting,
        role: portfolioData.Landingdata.data.role,
        description: portfolioData.Landingdata.data.description
      };

      // Handle profile picture upload
      if (req.files && req.files.landingImage) {
        landingData.profilePicture = req.files.landingImage[0].path;
      }

      // Upsert (update if exists, create if not)
      await Landing.findOneAndUpdate({}, landingData, { upsert: true });
    }

    // 2. Save Projects Data
    if (portfolioData.ProjectsData && portfolioData.ProjectsData.data) {
      // Delete all existing projects
      await Project.deleteMany({});

      // Create new projects
      for (let i = 0; i < portfolioData.ProjectsData.data.length; i++) {
        const projectItem = portfolioData.ProjectsData.data[i];
        const projectData = {
          title: projectItem.title,
          short: projectItem.short,
          details: projectItem.details,
          link: projectItem.link
        };

        // Handle project image upload
        if (req.files && req.files[`projectImage_${i}`]) {
          projectData.image = req.files[`projectImage_${i}`][0].path;
        }

        await Project.create(projectData);
      }
    }

    // 3. Save About Data
    if (portfolioData.AboutMeData) {
      const aboutData = {
        subTitle: portfolioData.AboutMeData.subTitle,
        whoIam: portfolioData.AboutMeData.whoIam,
        experience: portfolioData.AboutMeData.experience,
        projects: portfolioData.AboutMeData.projects,
        skills: portfolioData.AboutMeData.skills || []
      };

      await About.findOneAndUpdate({}, aboutData, { upsert: true });
    }

    // 4. Save Footer Data
    if (portfolioData.FooterData) {
      const footerData = {
        title: portfolioData.FooterData.title,
        socialLinks: portfolioData.FooterData.socialLinks || []
      };

      await Footer.findOneAndUpdate({}, footerData, { upsert: true });
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

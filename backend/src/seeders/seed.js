require('dotenv').config()
const { ROLES, CATEGORY, EXPERIENCE } = require('../constants/Constants')
const { sequelize, User, Job } = require('../models')
const { hashPassword } = require('../utils/passwordBcrypt')

const seed = async ()=>{
    try{

        await sequelize.authenticate()
        console.log('Connected to database for seeding');
       
        const adminPassword = await hashPassword('admin123')
        const admin = await User.create({
            name:'Admin',
            email:'admin@gmail.com',
            password:adminPassword,
            role:ROLES.ADMIN
        })
        console.log('Admin created successfully',admin.email);
        
        const userPassword = await hashPassword('user123')
        const user = await User.create({
            name:'test_user',
            email:'user@gmail.com',
            password:userPassword,
            role:ROLES.USER
        })
        console.log('User created successfully',user.email);

        const sampleJobs = [

      { title: 'Frontend Developer', description: 'Build UI with React', category: CATEGORY.ENGINEERING, experienceLevel: EXPERIENCE.MID, location: 'Kochi', salaryRange: '6-10 LPA' },
      { title: 'Backend Developer', description: 'Node.js and PostgreSQL', category: CATEGORY.ENGINEERING, experienceLevel: EXPERIENCE.SENIOR, location: 'Bangalore', salaryRange: '10-15 LPA' },
      { title: 'UI/UX Designer', description: 'Design user experiences', category: CATEGORY.DESIGN, experienceLevel: EXPERIENCE.ENTRY, location: 'Remote', salaryRange: '4-6 LPA' },
      { title: 'Sales Executive', description: 'Drive B2B sales', category: CATEGORY.SALES, experienceLevel: EXPERIENCE.MID, location: 'Mumbai', salaryRange: '5-8 LPA' },
      { title: 'Marketing Manager', description: 'Lead marketing campaigns', category: CATEGORY.MARKETING, experienceLevel: EXPERIENCE.SENIOR, location: 'Delhi', salaryRange: '12-18 LPA' },
      { title: 'Operations Analyst', description: 'Optimize operations', category: CATEGORY.OPERATIONS, experienceLevel: EXPERIENCE.ENTRY, location: 'Chennai', salaryRange: '3-5 LPA' },
      { title: 'Financial Analyst', description: 'Analyze financial data', category: CATEGORY.FINANCE, experienceLevel: EXPERIENCE.MID, location: 'Kochi', salaryRange: '6-9 LPA' },
      { title: 'React Developer', description: 'Build modern web apps', category: CATEGORY.ENGINEERING, experienceLevel: EXPERIENCE.ENTRY, location: 'Remote', salaryRange: '4-7 LPA' },
      { title: 'Graphic Designer', description: 'Create visual content', category: CATEGORY.DESIGN, experienceLevel: EXPERIENCE.MID, location: 'Kochi', salaryRange: '5-8 LPA' },
      { title: 'Sales Manager', description: 'Manage sales team', category: CATEGORY.SALES, experienceLevel: EXPERIENCE.SENIOR, location: 'Bangalore', salaryRange: '15-20 LPA' },
      { title: 'Senior Audit', description: 'Analyze financial data', category: CATEGORY.FINANCE, experienceLevel: EXPERIENCE.MID, location: 'Bangalore', salaryRange: '12-15 LPA' },
      { title: 'Analyst', description: 'Operational Analyst', category: CATEGORY.OPERATIONS, experienceLevel: EXPERIENCE.ENTRY, location: 'Kochi', salaryRange: '3-4 LPA' },
      { title: 'Business Analyst', description: 'Analyst business', category: CATEGORY.SALES, experienceLevel: EXPERIENCE.MID, location: 'Chennai', salaryRange: '6-9 LPA' },
      { title: 'Project Manager', description: 'Technical Project management', category: CATEGORY.ENGINEERING, experienceLevel: EXPERIENCE.MID, location: 'Kochi', salaryRange: '4-6 LPA' },

    ]
        for (const job of sampleJobs){
            await Job.create(job)
        }
        console.log(`${sampleJobs.length} sample jobs created`);
        console.log('Seeding completed successfully!!');
        process.exit(0)

    }catch(err){
        console.error('Seeding failed',err.message);
        process.exit(1)
        

    }
}

seed()


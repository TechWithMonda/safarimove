<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 font-sans">
    <!-- Navigation -->
<nav class="fixed w-full bg-gray-900 bg-opacity-95 z-50 border-b border-gray-800 shadow-lg">
  <div class="container mx-auto px-6 py-4 flex justify-between items-center">
    <div class="text-2xl font-bold text-purple-400 hover:text-white transition-colors duration-300">Samuel Monda</div>
    
    <!-- Desktop Navigation with proper spacing -->
    <div class="hidden md:flex space-x-8">
      <a href="#home" class="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300 font-medium">Home</a>
      <a href="#about" class="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300 font-medium">About</a>
      <a href="#skills" class="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300 font-medium">Skills</a>
      <a href="#projects" class="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300 font-medium">Projects</a>
      <a href="#contact" class="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300 font-medium">Contact</a>
    </div>
    
    <!-- Mobile Menu Button -->
    <button class="md:hidden focus:outline-none text-gray-300 hover:text-white transition-colors duration-300" @click="toggleMenu">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
  </div>
  
  <!-- Mobile Menu -->
  <div v-if="isMenuOpen" class="md:hidden bg-gray-800 px-6 py-4">
    <a href="#home" class="block py-3 text-gray-300 hover:text-white transition-colors duration-300 font-medium border-b border-gray-700" @click="toggleMenu">Home</a>
    <a href="#about" class="block py-3 text-gray-300 hover:text-white transition-colors duration-300 font-medium border-b border-gray-700" @click="toggleMenu">About</a>
    <a href="#skills" class="block py-3 text-gray-300 hover:text-white transition-colors duration-300 font-medium border-b border-gray-700" @click="toggleMenu">Skills</a>
    <a href="#projects" class="block py-3 text-gray-300 hover:text-white transition-colors duration-300 font-medium border-b border-gray-700" @click="toggleMenu">Projects</a>
    <a href="#contact" class="block py-3 text-gray-300 hover:text-white transition-colors duration-300 font-medium" @click="toggleMenu">Contact</a>
  </div>
</nav>
    <!-- Hero Section -->
    <section id="home" class="min-h-screen flex items-center pt-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-95"></div>
      <div class="absolute inset-0 opacity-20" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIiBzdHJva2U9IiM3ZjNmY2YiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMCAwaDQwdDQwdjQwSDB6Ii8+PC9zdmc+');"></div>
      <div class="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 mb-12 md:mb-0">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">
            <span class="block text-gray-300">Hello, I'm</span>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Samuel Monda</span>
          </h1>
          <div class="text-xl md:text-2xl mb-6 h-12">
            <span class="typing-text">{{ currentTypingText }}</span>
          </div>
          <p class="text-gray-400 mb-8 max-w-lg">
            Full-stack developer specializing in AI-powered solutions that transform businesses and user experiences.
          </p>
          <div class="flex space-x-4">
            <button @click="scrollTo('projects')" class="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl font-medium">
              View My Work
            </button>
            <button @click="scrollTo('contact')" class="border-2 border-purple-500 text-purple-400 hover:bg-purple-900 hover:bg-opacity-30 hover:text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1 font-medium">
              Hire Me
            </button>
          </div>
        </div>
        <div class="md:w-1/2 flex justify-center relative">
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-900 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <img src="/images/samuel.jpg" alt="Samuel Monda" class="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-purple-500 shadow-xl z-10">
          </div>
        </div>
      </div>
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" @click="scrollTo('about')">
        <div class="p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-70 transition-all duration-300">
          <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 bg-gray-900 bg-opacity-90 backdrop-blur-sm">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">
          About <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Me</span>
        </h2>
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/3 mb-10 md:mb-0 flex justify-center">
            <div class="relative group">
              <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-900 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <img src="/images/Monda.png" alt="Samuel Monda" class="relative w-64 h-64 rounded-lg object-cover shadow-xl z-10">
            </div>
          </div>
          <div class="md:w-2/3 md:pl-12">
            <p class="text-gray-400 mb-6">
              I'm a passionate <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 font-medium">full-stack developer</span> and AI enthusiast with expertise in both frontend (Vue.js, React) and backend (Django, Node.js) development.
            </p>
            <p class="text-gray-400 mb-8">
              I specialize in creating intelligent, performant web applications that leverage cutting-edge technologies to solve real-world problems. With a strong foundation in computer science and years of hands-on experience, I deliver robust solutions that drive business growth.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div class="bg-gray-800 p-6 rounded-lg text-center hover:transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-700">
                <div class="text-3xl font-bold text-purple-400 mb-2">{{ animatedProjectCount }}+</div>
                <div class="text-gray-400">Projects Completed</div>
              </div>
              <div class="bg-gray-800 p-6 rounded-lg text-center hover:transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-700">
                <div class="text-3xl font-bold text-purple-400 mb-2">{{ animatedClientCount }}+</div>
                <div class="text-gray-400">Happy Clients</div>
              </div>
              <div class="bg-gray-800 p-6 rounded-lg text-center hover:transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-700">
                <div class="text-3xl font-bold text-purple-400 mb-2">{{ animatedYearCount }}+</div>
                <div class="text-gray-400">Years Experience</div>
              </div>
            </div>
            <div class="flex space-x-4">
              <button @click="downloadCV" class="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl font-medium flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Download CV
              </button>
              <button @click="scrollTo('contact')" class="border-2 border-purple-500 text-purple-400 hover:bg-purple-900 hover:bg-opacity-30 hover:text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl font-medium flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="py-20 bg-black bg-opacity-90 backdrop-blur-sm">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">
          My <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Skills</span>
        </h2>
        
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <span v-for="(tag, index) in tags" 
                :key="index"
                :style="{ backgroundColor: tag.color, color: tag.textColor || '#fff' }"
                class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-md hover:shadow-lg"
                @mouseover="highlightedTag = index"
                @mouseout="highlightedTag = null">
            {{ tag.text }}
          </span>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(category, index) in skillCategories" :key="index" class="bg-gray-900 p-6 rounded-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
            <h3 class="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ category.name }}
            </h3>
            <div class="space-y-4">
              <div v-for="skill in category.skills" :key="skill.name" class="mb-4">
                <div class="flex justify-between mb-1">
                  <span class="text-gray-400">{{ skill.name }}</span>
                  <span class="text-purple-400">{{ skill.level }}%</span>
                </div>
                <div class="w-full bg-gray-800 rounded-full h-2">
                  <div class="bg-gradient-to-r from-purple-500 to-purple-700 h-2 rounded-full" :style="{ width: skill.level + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-20 bg-gray-900 bg-opacity-90 backdrop-blur-sm">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">
          Featured <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Projects</span>
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="project in projects" :key="project.id" class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 group">
            <div class="relative h-48 overflow-hidden">
              <img :src="project.image" :alt="project.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 class="text-xl font-bold text-white mb-2">{{ project.title }}</h3>
                <p class="text-gray-300 text-sm mb-4">{{ project.description }}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                  <span v-for="tech in project.technologies" :key="tech" class="bg-purple-900 bg-opacity-70 text-purple-300 text-xs px-3 py-1 rounded-full">
                    {{ tech }}
                  </span>
                </div>
                <div class="flex space-x-3">
                  <a :href="project.demo" target="_blank" class="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-4 py-2 rounded text-sm transition-all duration-300 shadow-md hover:shadow-lg">
                    Live Demo
                  </a>
                  <a :href="project.code" target="_blank" class="border border-purple-500 text-purple-400 hover:bg-purple-900 hover:bg-opacity-30 hover:text-white px-4 py-2 rounded text-sm transition-all duration-300 shadow-md hover:shadow-lg">
                    View Code
                  </a>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2 text-gray-300">{{ project.title }}</h3>
              <p class="text-gray-400 text-sm mb-4">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="tech in project.technologies" :key="tech" class="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline Section -->
    <section class="py-20 bg-black bg-opacity-90 backdrop-blur-sm">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">
          My <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Journey</span>
        </h2>
        
        <div class="relative">
          <!-- Timeline line -->
          <div class="hidden md:block absolute left-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-purple-800 transform -translate-x-1/2"></div>
          
          <!-- Timeline items -->
          <div class="space-y-8 md:space-y-16">
            <div v-for="(item, index) in timeline" :key="index" class="relative">
              <!-- Timeline dot -->
              <div class="hidden md:block absolute left-1/2 w-4 h-4 bg-purple-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 ring-2 ring-offset-2 ring-offset-black ring-purple-400"></div>
              
              <!-- Timeline content -->
              <div :class="['bg-gray-900 p-6 rounded-lg shadow-md md:w-5/12 border border-gray-800', index % 2 === 0 ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16']">
                <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-1">{{ item.title }}</h3>
                <span class="text-purple-400 text-sm">{{ item.date }}</span>
                <p class="text-gray-400 mt-3">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-gray-900 bg-opacity-90 backdrop-blur-sm">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">
          Get In <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Touch</span>
        </h2>
        
        <div class="flex flex-col lg:flex-row gap-12">
          <div class="lg:w-1/2">
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="bg-purple-600 bg-opacity-20 p-3 rounded-full">
                  <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-300">Email</h3>
                  <a href="mailto:samwelmonda48@gmail.com" class="text-gray-400 hover:text-white transition-colors duration-300">samwelmonda48@gmail.com</a>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="bg-purple-600 bg-opacity-20 p-3 rounded-full">
                  <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-300">Phone</h3>
                  <a href="tel:+254745232052" class="text-gray-400 hover:text-white transition-colors duration-300">+254 745 232 052</a>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="bg-purple-600 bg-opacity-20 p-3 rounded-full">
                  <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-300">Location</h3>
                  <span class="text-gray-400">Nairobi, Kenya</span>
                </div>
              </div>
            </div>
            
            <div class="mt-10">
              <h3 class="text-xl font-bold mb-4 text-gray-300">Connect With Me</h3>
              <div class="flex space-x-4">
                <a href="#" class="bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg">
                  <svg class="w-5 h-5 text-gray-300 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" class="bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg">
                  <svg class="w-5 h-5 text-gray-300 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" class="bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg">
                  <svg class="w-5 h-5 text-gray-300 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" class="bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg">
                  <svg class="w-5 h-5 text-gray-300 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.5 6.5c0 1.933 1.567 3.5 3.5 3.5s3.5-1.567 3.5-3.5-1.567-3.5-3.5-3.5-3.5 1.567-3.5 3.5zm1.5 0c0-1.103.897-2 2-2s2 .897 2 2-.897 2-2 2-2-.897-2-2zm6.5 5.5c-1.654 0-3 1.346-3 3v7h2v-7c0-.551.449-1 1-1h7c.551 0 1 .449 1 1v7h2v-7c0-1.654-1.346-3-3-3h-7zm-15 2v9h2v-9h-2zm4 0v9h2v-9h-2zm4 0v9h2v-9h-2zm-8 2v5h2v-5h-2zm4 0v5h2v-5h-2zm4 0v5h2v-5h-2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div class="lg:w-1/2">
            <form @submit.prevent="submitForm" class="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
              <div class="mb-6">
                <label for="name" class="block text-gray-300 mb-2 font-medium">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  required 
                  class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-300 placeholder-gray-500"
                  placeholder="John Doe"
                >
              </div>
              <div class="mb-6">
                <label for="email" class="block text-gray-300 mb-2 font-medium">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  required 
                  class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-300 placeholder-gray-500"
                  placeholder="john@example.com"
                >
              </div>
              <div class="mb-6">
                <label for="subject" class="block text-gray-300 mb-2 font-medium">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  v-model="form.subject" 
                  required 
                  class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-300 placeholder-gray-500"
                  placeholder="Project Inquiry"
                >
              </div>
              <div class="mb-6">
                <label for="message" class="block text-gray-300 mb-2 font-medium">Your Message</label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  required 
                  rows="5"
                  class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-300 placeholder-gray-500"
                  placeholder="Hello Samuel, I'd like to discuss a potential project..."
                ></textarea>
              </div>
              <button type="submit" class="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl font-medium w-full flex items-center justify-center">
                <span v-if="!sending">Send Message</span>
                <span v-else class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-black py-8 border-t border-gray-800">
      <div class="container mx-auto px-6 text-center">
        <p class="text-gray-500">© 2023 Samuel Monda. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    // Mobile menu state
    const isMenuOpen = ref(false)
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    // Hero section
    const typingTexts = [
      'Full-Stack Developer',
      'AI Solutions Architect',
      'Vue.js Specialist',
      'Django Expert',
      'Tech Innovator'
    ]
    const currentTypingText = ref('')
    const currentTextIndex = ref(0)
    const isTyping = ref(true)
    const typingSpeed = 100
    const erasingSpeed = 50
    const newTextDelay = 2000

    // Animated stats
    const animatedProjectCount = ref(0)
    const animatedClientCount = ref(0)
    const animatedYearCount = ref(0)
    const targetProjectCount = 27
    const targetClientCount = 18
    const targetYearCount = 4

    // Skills data
    const tags = ref([
      { text: 'Vue.js', color: '#42b883' },
      { text: 'React', color: '#61dafb' },
      { text: 'Django', color: '#092e20' },
      { text: 'Python', color: '#3776ab' },
      { text: 'JavaScript', color: '#f7df1e', textColor: '#000' },
      { text: 'TypeScript', color: '#3178c6' },
      { text: 'AI/ML', color: '#FF6B6B' },
      { text: 'TensorFlow', color: '#FF8E53' },
      { text: 'Node.js', color: '#68a063' },
      { text: 'Docker', color: '#2496ed' },
      { text: 'AWS', color: '#232f3e' },
      { text: 'Git', color: '#f05032' },
      { text: 'REST API', color: '#6bd1ff' },
      { text: 'GraphQL', color: '#e535ab' },
      { text: 'MongoDB', color: '#47a248' },
      { text: 'PostgreSQL', color: '#336791' }
    ])
    const highlightedTag = ref(null)

    const skillCategories = ref([
      {
        name: 'Frontend',
        skills: [
          { name: 'Vue.js', level: 95 },
          { name: 'React', level: 90 },
          { name: 'JavaScript/ES6+', level: 92 },
          { name: 'HTML/CSS', level: 98 },
          { name: 'TypeScript', level: 85 }
        ]
      },
      {
        name: 'Backend',
        skills: [
          { name: 'Django', level: 90 },
          { name: 'Python', level: 93 },
          { name: 'Node.js', level: 85 },
          { name: 'REST APIs', level: 88 },
          { name: 'GraphQL', level: 80 }
        ]
      },
      {
        name: 'AI & Data',
        skills: [
          { name: 'Machine Learning', level: 85 },
          { name: 'Natural Language Processing', level: 80 },
          { name: 'TensorFlow', level: 75 },
          { name: 'Data Analysis', level: 82 },
          { name: 'Neural Networks', level: 78 }
        ]
      }
    ])

    // Projects data
    const projects = ref([
      {
        id: 1,
        title: 'JibuAI',
        description: 'An intelligent question-answering platform leveraging natural language processing to provide accurate, context-aware responses.',
        technologies: ['Vue.js', 'Django', 'TensorFlow', 'NLP'],
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        demo: '#',
        code: '#'
      },
      {
        id: 2,
        title: 'TibaGoAI',
        description: 'Healthcare AI platform that provides personalized medical recommendations and connects patients with specialists.',
        technologies: ['React', 'Node.js', 'Machine Learning', 'MongoDB'],
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        demo: '#',
        code: '#'
      },
      {
        id: 3,
        title: 'BlackSamurai',
        description: 'Cybersecurity platform with AI-powered threat detection and automated defense mechanisms.',
        technologies: ['Python', 'Django', 'Cybersecurity', 'AWS'],
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        demo: '#',
        code: '#'
      }
    ])

    // Timeline data
    const timeline = ref([
      {
        title: 'Software Engineering Degree',
        date: '2016 - 2020',
        description: 'Graduated with honors in Computer Science from University of Nairobi, specializing in AI and web technologies.'
      },
      {
        title: 'Junior Developer at TechStart',
        date: '2020 - 2021',
        description: 'Developed and maintained web applications using Vue.js and Django, contributing to 5 major projects.'
      },
      {
        title: 'Freelance Developer',
        date: '2021 - 2022',
        description: 'Built custom solutions for 12 clients across various industries, specializing in AI integration.'
      },
      {
        title: 'Founder & Lead Developer',
        date: '2022 - Present',
        description: 'Launched my own AI development studio, creating innovative solutions like JibuAI and TibaGoAI.'
      }
    ])

    // Contact form
    const form = ref({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    const sending = ref(false)

    // Methods
    const typeText = () => {
      if (isTyping.value) {
        // Typing
        if (currentTypingText.value.length < typingTexts[currentTextIndex.value].length) {
          currentTypingText.value += typingTexts[currentTextIndex.value].charAt(currentTypingText.value.length)
          setTimeout(typeText, typingSpeed)
        } else {
          isTyping.value = false
          setTimeout(typeText, newTextDelay)
        }
      } else {
        // Erasing
        if (currentTypingText.value.length > 0) {
          currentTypingText.value = currentTypingText.value.substring(0, currentTypingText.value.length - 1)
          setTimeout(typeText, erasingSpeed)
        } else {
          isTyping.value = true
          currentTextIndex.value = (currentTextIndex.value + 1) % typingTexts.length
          setTimeout(typeText, typingSpeed)
        }
      }
    }

    const scrollTo = (section) => {
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        isMenuOpen.value = false
      }
    }

    const animateStats = () => {
      const projectInterval = setInterval(() => {
        if (animatedProjectCount.value < targetProjectCount) {
          animatedProjectCount.value++
        } else {
          clearInterval(projectInterval)
        }
      }, 30)

      const clientInterval = setInterval(() => {
        if (animatedClientCount.value < targetClientCount) {
          animatedClientCount.value++
        } else {
          clearInterval(clientInterval)
        }
      }, 40)

      const yearInterval = setInterval(() => {
        if (animatedYearCount.value < targetYearCount) {
          animatedYearCount.value++
        } else {
          clearInterval(yearInterval)
        }
      }, 200)
    }

    const submitForm = () => {
      sending.value = true
      // Simulate API call
      setTimeout(() => {
        sending.value = false
        // Reset form
        form.value = { name: '', email: '', subject: '', message: '' }
        // Show success message
        alert('Thank you for your message! I will get back to you soon.')
      }, 1500)
    }

    const downloadCV = () => {
      // In a real implementation, this would download your CV
      alert('Downloading CV...')
      // Create a temporary link to trigger download
      const link = document.createElement('a')
      link.href = '/path-to-your-cv.pdf'
      link.download = 'Samuel_Monda_CV.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    // Lifecycle hooks
    onMounted(() => {
      typeText()
      animateStats()
    })

    return {
      isMenuOpen,
      toggleMenu,
      currentTypingText,
      animatedProjectCount,
      animatedClientCount,
      animatedYearCount,
      tags,
      highlightedTag,
      skillCategories,
      projects,
      timeline,
      form,
      sending,
      scrollTo,
      submitForm,
      downloadCV
    }
  }
}
</script>

<style>
/* Custom animations */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #111;
}

::-webkit-scrollbar-thumb {
  background: #6b46c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #805ad5;
}

/* Smooth transitions */
.transition {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Typing animation */
.typing-text {
  border-right: 2px solid;
  animation: blink-caret 0.75s step-end infinite;
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: #9f7aea; }
}

/* Backdrop blur */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>
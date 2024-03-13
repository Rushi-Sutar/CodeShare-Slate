import React from 'react'

function Features() {
  return (
    <section className="bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Features</h2>
          <p className="text-gray-400">Discover what makes CodeShare Slate the perfect tool for collaboration.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6">
            <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
            <h3 className="text-xl font-bold mb-2 text-white">Real-time Collaboration</h3>
            <p className="text-gray-400 text-center">Work together with your team in real-time. See changes instantly and brainstorm ideas effortlessly.</p>
          </div>
          <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6">
            <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
            <h3 className="text-xl font-bold mb-2 text-white">Code Sharing</h3>
            <p className="text-gray-400 text-center">Share your code snippets, scripts, and projects with ease. Collaborate on debugging, optimization, and development tasks seamlessly.</p>
          </div>
          <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6">
            <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
            <h3 className="text-xl font-bold mb-2 text-white">Interactive Whiteboard</h3>
            <p className="text-gray-400 text-center">Visualize your ideas, workflows, and concepts using our interactive whiteboard. Sketch, draw, and annotate to communicate effectively.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features

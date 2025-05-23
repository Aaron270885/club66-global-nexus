
import React from "react";
import Layout from "@/components/layout/Layout";

const ChangingLives = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-club66-purple">
          Changing Lives!
        </h1>
        
        <div className="max-w-4xl mx-auto prose prose-lg">
          <p>
            At Club66, our mission extends far beyond providing membership 
            benefits. We are committed to making a real, tangible difference 
            in the communities we serve.
          </p>
          
          <h2>Our Impact</h2>
          <p>
            Through various initiatives and social responsibility programs, 
            Club66 has been able to touch thousands of lives across Africa. 
            From educational scholarships to entrepreneurial support, we believe 
            in empowering individuals to create better futures for themselves, 
            their families, and their communities.
          </p>
          
          <h2>Success Stories</h2>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 my-6">
            <h3 className="font-bold mb-2">Aminata's Story</h3>
            <p>
              "Through Club66's scholarship program, I was able to complete my 
              education in computer science. Today, I run my own tech startup 
              that employs seven young professionals in Bamako."
            </p>
            <p className="text-sm text-gray-600 mt-2">
              — Aminata D., Club66 Scholarship Recipient
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 my-6">
            <h3 className="font-bold mb-2">Ibrahim's Enterprise</h3>
            <p>
              "The startup capital I received from Club66 helped me expand my 
              small grocery store into a thriving business. I can now provide 
              for my family and even hire two employees from my community."
            </p>
            <p className="text-sm text-gray-600 mt-2">
              — Ibrahim T., Business Grant Recipient
            </p>
          </div>
          
          <h2>Join Our Mission</h2>
          <p>
            By becoming a Club66 member, you're not just gaining access to 
            discounts and services—you're becoming part of a movement that's 
            transforming lives and communities throughout Africa.
          </p>
          <p>
            A percentage of every membership fee goes directly to our social 
            impact initiatives, meaning your membership is helping create 
            positive change.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ChangingLives;

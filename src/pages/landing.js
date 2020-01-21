import { Link } from 'react-router-dom';
import Button from '../components/button';
import React from 'react';
import watercolor from '../images/trans-wc.png';


const LandingPage = () => (
  <section className="flex -mx-4 text-black-droplet items-stretch relative z-10">
    <div className="flex relative z-10">
      <div className="xl:w-2/3 px-4 relative z-10">
        <h1 className="h1 text-black-droplet">
          What's on your mind?
        </h1>
        <h3 className="h3 text-black-droplet-light">
          Slowdrip is your thoughtful, daily journal. You'll be able to view all of your daily thoughts through time, so the longer you use Slowdrip, the greater your potential for personal growth!
        </h3>
        <section className="mt-12 mb-8 leading-tight">
          <p>
            To help you reflect honestly, a finished thought can't be edited!
          </p>
        </section>
        <Button success xl as={Link} to="/sign-up">
          Sign up
        </Button>
        <Button outline xl className="border-purple-droplet ml-8" as={Link} to="/droplets">
          See my entries
        </Button>
      </div>
      <div className="xl:w-1/3 pl-4">
        <img src={watercolor} className="absolute z-0 opacity-25 pointer-events-none" style={{ left: "25%", top: "-45%" }} />
      </div>
    </div>
  </section>
);
  
export default LandingPage;

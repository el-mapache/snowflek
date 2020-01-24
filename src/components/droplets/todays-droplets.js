import { differenceInMonths } from 'date-fns';
import { HeadingCard } from '../card';
import Droplet from '../droplet';
import React from 'react';

const dropletMonthsShowing = (current, oldest) =>
  differenceInMonths(new Date(current), new Date(oldest)) ;

const TodaysDroplets = ({ droplets }) => {  
  return (
    <>
      <HeadingCard
        as="section"
        className="mx-auto"
        heading={
          <>
            <h1 className="h2 text-offwhite font-serif" style={{ marginBottom: 0, marginTop: 0 }}>
              Your droplets
            </h1>
            <h4 className="leading-tight text-yellow-droplet">
              <em>
                Currently showing { dropletMonthsShowing(droplets[0].created_at, droplets[droplets.length - 1].created_at) } months of droplets
              </em>
            </h4>
          </>
        }
      >
          {
            droplets.map((droplet) => {
              return (
                <Droplet
                  {...droplet}
                  key={`${droplet.id}${droplet.created_at}`}
                />
              );
            })
          }
      </HeadingCard>
    </>
  );
};

export default TodaysDroplets;

///**
// * <div class="max-w-6xl rounded-lg bg-purple-droplet mx-auto pt-1"><h1 class="h3 mx-auto max-w-5xl text-white">Today's Droplets</h1><h4 class="h5 text-yellow-droplet mx-auto max-w-5xl shadow-md"><em>You've been writing for interpolated thing! Go you.</em></h4><section class="sc-dnqmqq cZhdAZ mx-auto max-w-5xl"><p>I like coyotes</p><p>Woof woof woof</p><p>Bark bark bark [friends]</p><p>I know calculus</p></section></div>
 //*/
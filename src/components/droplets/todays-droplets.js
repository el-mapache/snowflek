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
            <h1 className="h2 text-offwhite font-sans" style={{ marginBottom: 0, marginTop: 0 }}>
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

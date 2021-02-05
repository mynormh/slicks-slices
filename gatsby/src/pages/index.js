import React from 'react';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      {!slicemasters ? <LoadingGrid count={4} /> : null}
      {/* Check if we have the slicemasters array but it's empty */}
      {slicemasters && !slicemasters?.length ? (
        <p>No one is working right now</p>
      ) : null}
    </div>
  );
}

function HotSlices({ hotSlices }) {
  return (
    <div>
      {!hotSlices ? <LoadingGrid count={4} /> : null}
      {/* Check if we have the hotSlices array but it's empty */}
      {hotSlices && !hotSlices?.length ? <p>Nothing in the case</p> : null}
    </div>
  );
}

function HomePage() {
  const { slicemasters, hotSlices } = useLatestData();
  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  );
}

export default HomePage;

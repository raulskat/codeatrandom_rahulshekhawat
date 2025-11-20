import type { RoadmapResponse } from '../types';

type RoadmapProps = {
  data: RoadmapResponse | null;
};

const RoadmapCard = ({ data }: RoadmapProps) => {
  if (!data) {
    return (
      <div className="card">
        <h3>Career Roadmap</h3>
        <p>Generate a roadmap to see the phased plan for your next role.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Roadmap for {data.targetRole}</h3>
      <ul className="list">
        {data.phases.map((phase) => (
          <li key={phase.phase}>
            <strong>{phase.phase}:</strong> {phase.focus}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoadmapCard;


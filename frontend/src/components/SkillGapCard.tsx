import type { SkillGapResponse } from '../types';

type SkillGapCardProps = {
  data: SkillGapResponse | null;
};

const renderList = (items: string[], emptyLabel: string) => {
  if (!items.length) {
    return <p>{emptyLabel}</p>;
  }
  return (
    <ul className="list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

const SkillGapCard = ({ data }: SkillGapCardProps) => {
  if (!data) {
    return (
      <div className="card">
        <h3>Skill Gap Analyzer</h3>
        <p>Run an analysis to view matched and missing skills.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Skill Gap for {data.targetRole}</h3>
      <section>
        <strong>Matched Skills</strong>
        <div>
          {data.matchedSkills.length ? (
            data.matchedSkills.map((skill) => (
              <span className="pill" key={skill}>
                {skill}
              </span>
            ))
          ) : (
            <p>No overlaps yet. Time to start fresh!</p>
          )}
        </div>
      </section>
      <section>
        <strong>Missing Skills</strong>
        {renderList(data.missingSkills, 'Looks like all required skills are covered.')}
      </section>
      <section>
        <strong>Recommendations</strong>
        {renderList(
          data.recommendations,
          'Great job! Focus on building deeper projects to showcase expertise.'
        )}
      </section>
      <section>
        <strong>Suggested Learning Order</strong>
        {data.suggestedLearningOrder.length ? (
          <ul className="list">
            {data.suggestedLearningOrder.map((item) => (
              <li key={item.skill}>
                Step {item.step}: {item.skill}
              </li>
            ))}
          </ul>
        ) : (
          <p>Continue refining strengths and move into advanced topics.</p>
        )}
      </section>
    </div>
  );
};

export default SkillGapCard;


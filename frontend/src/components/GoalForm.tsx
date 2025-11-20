type GoalFormProps = {
  targetRole: string;
  currentSkills: string;
  loading: boolean;
  onTargetRoleChange: (value: string) => void;
  onCurrentSkillsChange: (value: string) => void;
  onSubmit: () => void;
};

const ROLE_HINTS = ['Frontend Developer', 'Backend Developer', 'Data Analyst'];

const GoalForm = ({
  targetRole,
  currentSkills,
  loading,
  onTargetRoleChange,
  onCurrentSkillsChange,
  onSubmit
}: GoalFormProps) => {
  return (
    <div className="card">
      <h2>Career Goal Input</h2>
      <p className="tagline">Share where you are today so we can map your next steps.</p>
      <div className="form-grid">
        <div className="control">
          <label htmlFor="role">Target Role</label>
          <input
            id="role"
            placeholder="e.g. Backend Developer"
            list="role-hints"
            value={targetRole}
            onChange={(event) => onTargetRoleChange(event.target.value)}
          />
          <datalist id="role-hints">
            {ROLE_HINTS.map((role) => (
              <option key={role} value={role} />
            ))}
          </datalist>
        </div>
        <div className="control">
          <label htmlFor="skills">Current Skills (comma separated)</label>
          <textarea
            id="skills"
            placeholder="Java, SQL, Git"
            rows={3}
            value={currentSkills}
            onChange={(event) => onCurrentSkillsChange(event.target.value)}
          />
        </div>
      </div>
      <button
        className="primary-btn"
        onClick={onSubmit}
        disabled={!targetRole.trim() || loading}
      >
        {loading ? 'Analyzing...' : 'Analyze My Career Path'}
      </button>
    </div>
  );
};

export default GoalForm;


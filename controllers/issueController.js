const  Issue  = require('../models/issue');

exports.getIssueDetails = async (req, res) => {
  const { issueID } = req.params;

  try {
    const issue = await Issue.findByPk(issueID);
    if (!issue) return res.status(404).json({ message: 'Issue not found' });

    res.status(200).json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

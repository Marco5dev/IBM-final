const natural = require('natural');
const sentimentAnalyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');

function analyze(text) {
  if (!text) return 0;
  return sentimentAnalyzer.getSentiment(text.split(/\s+/));
}

module.exports = { analyze };

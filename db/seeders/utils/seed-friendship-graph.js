const jsnx = require('jsnetworkx');

function seedFriendshipGraph(users, avgFriendships) {
  const friendshipGraph = generateFriendshipGraph(users, avgFriendships);
  const friendships = transformFriendshipGraph(friendshipGraph);
  return friendships;
}

function generateFriendshipGraph(users, avgFriendships) {
  let friendshipGraph = jsnx.gnpRandomGraph(
    users.length,
    avgFriendships / users.length
  );

  friendshipGraph = jsnx.relabelNodes(
    friendshipGraph,
    x => users[x].id);

  return friendshipGraph;
}

function transformFriendshipGraph(friendshipGraph) {
  const edges = friendshipGraph.edges();

  const friendships = Array(edges.length).fill().map((_, i) => {
    return {
      user_id_1: edges[i][0],
      user_id_2: edges[i][1],
    };
  });

  return friendships;
}

module.exports = seedFriendshipGraph;
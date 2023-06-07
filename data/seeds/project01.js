/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").truncate();
  await knex("posts").truncate();
  await knex("roles").truncate();
  await knex("favorites").truncate();
  await knex("comments").truncate();

  await knex("users").insert([
    {
      username: "elonmusk",
      password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq", // password "1234"
      email: "elonmusk@notmail.com",
      avatar_url:
        "https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg",
    },
    {
      username: "barackobama",
      password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq", // password "1234"
      email: "barackobama@notmail.com",
      avatar_url:
        "https://pbs.twimg.com/profile_images/1329647526807543809/2SGvnHYV_400x400.jpg",
    },
    {
      username: "justinbieber",
      password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq", // password "1234"
      email: "justinbieber@notmail.com",
      avatar_url:
        "https://pbs.twimg.com/profile_images/1473447174591684612/vlsbWYtq_400x400.jpg",
    },
  ]);
  await knex("posts").insert([
    {
      body: "Just had the most amazing sunset hike! Nature's beauty never fails to inspire me. 🌅 #naturelovers #hikingadventures",
      user_id: 1,
    },
    {
      body: "Can't believe it's already June! Time flies when you're having fun. 😄 Looking forward to making the most of this summer. ☀️ #summerfun #goodtimes",
      user_id: 1,
    },
    {
      body: "Trying out a new recipe today, and it turned out delicious! 😋 Cooking is such a therapeutic activity for me. #foodie #homemade",
      user_id: 2,
    },
    {
      body: "Feeling grateful for all the incredible people in my life. Surrounding yourself with positive vibes is the key to happiness. 🙌 #gratitude #positivity",
      user_id: 2,
    },
    {
      body: "Just finished reading an amazing book that kept me hooked till the last page. 📚 Highly recommend it to all the fellow bookworms out there! #booklover #readinglist",
      user_id: 3,
    },
    {
      body: "Spent the afternoon exploring a hidden gem in the city. Sometimes the best discoveries are right in your own backyard. #adventureawaits #cityexploration",
      user_id: 3,
    },
    {
      body: "Taking a break from screens and enjoying a digital detox. It's refreshing to disconnect and focus on the present moment. #unplug #mindfulness",
      user_id: 3,
    },
  ]);

  await knex("roles").insert([
    { user_id: 1, rolename: "Admin" },
    { user_id: 2, rolename: "User" },
    { user_id: 3, rolename: "User" },
  ]);

  await knex("favorites").insert([
    { user_id: 1, post_id: 3 },
    { user_id: 1, post_id: 4 },
    { user_id: 1, post_id: 5 },
    { user_id: 2, post_id: 1 },
    { user_id: 2, post_id: 6 },
    { user_id: 3, post_id: 1 },
    { user_id: 3, post_id: 2 },
  ]);
  await knex("comments").insert([
    { body: "This is a great article!", user_id: 1, post_id: 7 },
    { body: "Thank you, it was very helpful.", user_id: 1, post_id: 6 },
    {
      body: "Seems like there is missing information.",
      user_id: 1,
      post_id: 5,
    },
    { body: "Exactly what I was looking for!", user_id: 2, post_id: 7 },
    {
      body: "I have a question regarding this topic.",
      user_id: 2,
      post_id: 6,
    },
    {
      body: "I disagree with some points mentioned here.",
      user_id: 2,
      post_id: 5,
    },
    { body: "Well written and easy to understand.", user_id: 3, post_id: 1 },
    { body: "I would love to see more examples.", user_id: 3, post_id: 2 },
    { body: "Great job, keep up the good work!", user_id: 3, post_id: 3 },
    {
      body: "I found a typo in the second paragraph.",
      user_id: 3,
      post_id: 4,
    },
  ]);
};

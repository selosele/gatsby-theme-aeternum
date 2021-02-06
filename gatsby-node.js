const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const createPaginatedPages = require('gatsby-paginate');
const siteConfig = require('./config');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve(`${__dirname}`, './src/components/postView.js');
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
            ) {
              edges {
                node {
                  id
                  fields {
                    slug
                  }
                  excerpt
                  frontmatter {
                    slug
                    date(formatString: "YYYY년 MM월 DD일")
                    title
                    subtitle
                    description
                    image
                    categories
                    tags
                  }
                }
              }
            }
          }
        `,
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const posts = result.data.allMarkdownRemark.edges;

        // index 페이지 생성
        createPaginatedPages({
          edges: posts,
          createPage: createPage,
          pageTemplate: 'src/templates/index.js',
          pageLength: siteConfig.postsPerPage,
          pathPrefix: 'page',
          buildPath: (index, pathPrefix) =>
            index > 1 ? `${pathPrefix}${index}` : `/`,
          context: {},
        })

        _.each(posts, (post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

          // 포스트 뷰페이지 생성
          createPage({
            path: post.node.frontmatter.slug,
            component: blogPost,
            context: {
              slug: post.node.frontmatter.slug,
              previous,
              next,
            },
          });
        });
      }),
    );
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
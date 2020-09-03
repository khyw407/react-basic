let cssJoin = (...args) => `
  &&& {
    ${args.filter(Boolean).join('\n')}
  }
`;

export default cssJoin;
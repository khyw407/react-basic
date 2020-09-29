let cssJoin = (...args) => `
  &&& {
    ${args
      .map(str => str?.trim?.())
      .filter(Boolean)
      .map(str => `& { ${str} }`)
      .join('\n')}
  }
`;

export default cssJoin;

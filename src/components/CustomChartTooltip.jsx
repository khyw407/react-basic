import React from 'react';

let CustomChartTooltip = ({ active, payload, label, maxItemsInCol = 10 }) => {
  let numCols = Math.ceil((payload?.length ?? 0) / maxItemsInCol);

  if (!active) return null;

  return (
    <div css={`
      margin: 0px;
      padding: 10px;
      background-color: rgb(255, 255, 255);
      border: 1px solid rgb(204, 204, 204);
    `}>
      <p css="margin: 0">{label}</p>
      <div css={`
        display: flex;
      `}>
        {Array(numCols).fill().map((x, i) => (
          <div key={i} css={`
            &:not(:last-child) {
              margin-right: 8px;
            }
          `}>
            {payload.slice(i * maxItemsInCol, (i + 1) * maxItemsInCol).map((item, itemIndex) => (
              <div key={itemIndex} css={`
                padding: 4px 0;
                color: ${item.color};
                white-space: nowrap;
              `}>{item.name} : {item.value}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomChartTooltip;

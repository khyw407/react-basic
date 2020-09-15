import React from 'react';
import styled from 'styled-components';
import {
  Accordion, AccordionSummary, AccordionDetails, Typography, IconButton,
  Dialog, DialogTitle, DialogContent, Grow,
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';

let IconBtn = styled(IconButton)`
  padding: 10px;
  margin-top: -10px;
  margin-bottom: -10px;
`;

let AccordionPane = ({ title, titleMiddle, disableZoom, children, ...props }) => {
  let [expanded, setExpanded] = React.useState(true);
  let [modalIsOpen, setModalIsOpen] = React.useState(false);
  let toggleExpand = () => setExpanded(ex => !ex);
  let openModal = () => setModalIsOpen(true);
  let closeModal = () => setModalIsOpen(false);
  let renderChildren = type => {
    if (typeof children !== 'function') return children;
    let isDetailView = type === 'MODAL';
    return children({ isDetailView });
  };

  return (
    <div>
      <Accordion
        TransitionProps={{ unmountOnExit: true }}
        expanded={expanded}
        onChange={e => 0}
        {...props}
      >
        <AccordionSummary css={`
          &&& {
            cursor: default;
            user-select: auto;
          }
          &.Mui-focused {
            background: white;
          }
          .MuiAccordionSummary-content {
            align-items: center;
          }
        `}>
          <Typography variant="h6">{title}</Typography>
          <div css="flex: 1; margin: 0 24px;">{titleMiddle}</div>
          <div>
            <IconBtn onClick={toggleExpand}>
              {expanded ? <RemoveIcon /> : <ExpandMoreIcon css="font-size: 28px; margin: -4px;" />}
            </IconBtn>
            {!disableZoom && <IconBtn onClick={openModal}><ZoomOutMapIcon /></IconBtn>}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {renderChildren()}
        </AccordionDetails>
      </Accordion>
      {!disableZoom && (
        <Dialog
          TransitionComponent={Grow}
          open={modalIsOpen}
          onClose={closeModal}
          css={`
            .MuiPaper-root {
              max-width: 100%;
              width: 85vw;
              height: 85vh;
            }
          `}
        >
          <DialogTitle disableTypography css={`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}>
            <Typography variant="h6">{title}</Typography>
            <IconButton onClick={closeModal} css={`
              padding: 10px;
              margin: -10px;
              margin-left: 0;
            `}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent className="AccordionPane-detailView">
            {renderChildren('MODAL')}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AccordionPane;

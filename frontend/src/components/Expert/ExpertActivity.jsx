/* eslint-disable multiline-ternary */
/* eslint-disable space-before-function-paren */
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Navbar from '../NavBar/Navbar';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import MyAnswerCard from './MyAnswerCard';
import MyQesCard from './MyQesCard';
import SortIcon from '@mui/icons-material/Sort';
import { MenuItem, Button, Menu } from '@mui/material';
import styles from './Expert.module.css';
import List from './List'
// eslint-disable-next-line space-before-function-paren
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div className={styles.vipbackground2}>
      <div
        className={styles.vipbackground}
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const sampleData = [
    {
      id: 1,
      title: 'ESLint with React gives `no-unused-vars` errors',
      photo: ['', '', ''],
      qes: "I've setup eslint & eslint-plugin-react When I run ESLint, the linter returns no-unused-vars errors for each React component. I'm assuming it's not recognizing that I'm using JSX or React syntax. Any ideas?",
      ans: 'First, install the following module npm install --save-dev eslint-plugin-react. Then, in your .eslintrc.json, under extends, include the following plugin:\'extends\': [\'plugin:react/recommended\']',
      photoURL: 'https://i.postimg.cc/xC7fp7LN/1.jpg',
      score: 10,
      time: '2022/02/31 19:49:03'
    },
    {
      id: 2,
      title: 'Why is java var type variables not working?',
      qes: 'I declared var type variable however the program throws compilation error. Can someone suggest the reason for this error?',
      ans: 'The output from the java -version command you posted above indicates you are using Java 8. var was only introduced in to the language at java 10. If you want to use var you need to install a more recent version of Java - Java 10 or above. This is an include file. It gets literally copy-pasted on your sources. On top of that, the compiler could notify the error around the wrong line, but it could be before or after the one which is actually wrong. Check your sources that include such header, you must miss a semicolon there, or another typo. You should not look into the header. ',
      photoURL: 'https://i.postimg.cc/BvP4Lprq/2.jpg',
      score: 3,
      time: '2022/03/11 10:49:03'
    },
    {
      id: 3,
      title: 'How can I fix this problem with bulding project at Vitis?',
      qes: "I'm trying to build a project with vitis using the library xuartps.h but I can't because of this error code screenchot. I don't know why this happens. Could you help me please?",
      ans: '',
      photoURL: '',
      score: 20,
      time: '2022/01/11 12:49:03'
    },
    {
      id: 4,
      title: 'C++ set slower than Java TreeSet?',
      qes: 'I was working on leetcode problem 792. Number of Matching Subsequences, and one of the initial solutions I came up with was to create a list of ordered sets. Then we can determine if a word is a subsequence of string s by trying to find the ceiling of the next available character of string word using the current index we are in of s. If we can reach the end of word, it is then a subsequence, otherwise, it is not.',
      ans: '',
      photoURL: '',
      score: 3,
      time: '2022/01/11 12:49:03'
    },
    {
      id: 5,
      title: 'How can I fix this problem with bulding project at Vitis?',
      qes: "I'm trying to build a project with vitis using the library xuartps.h but I can't because of this error code screenchot. I don't know why this happens. Could you help me please?",
      ans: '',
      photoURL: '',
      score: 10,
      time: '2022/01/11 12:49:03'
    },
  ];
  if (localStorage.getItem('data') === null) {
    localStorage.setItem('data', sampleData);
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {' '}
      <div className="home">
        {' '}
        {localStorage.getItem('token') ? (
          <LoggedNarbar></LoggedNarbar>
        ) : (
          <Navbar></Navbar>
        )}
      </div>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          height: '100%',
          weight: '100%'
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            width: '15vw',
            minWidth: 'max-content',
          }}
        >
          <Tab label="Answer History" {...a11yProps(0)} />
          <Tab label="New Questions" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              margin: 'auto',
              color: 'grey !important',
              marginLeft: '1.5rem',
            }}
          >
            <SortIcon></SortIcon>Sort
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Time (new to old)</MenuItem>
            <MenuItem onClick={handleClose}>Time (old to new)</MenuItem>
          </Menu>
          <Box sx={{ margin: 'auto', display: 'flex', opacity: '0.95' }}>
            <Box sx={{ width: '50%', margin: 'auto' }}>
              {sampleData.map((e, i) => {
                return (
                  <MyAnswerCard
                    key={'resultCard' + i}
                    data={e}
                  ></MyAnswerCard>
                );
              })}
            </Box>
            <Box
              sx={{
                width: '40%',
              }}
            >
            <List></List>

            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              margin: 'auto',
              color: 'grey !important',
              marginLeft: '1.5rem',
            }}
          >
            <SortIcon></SortIcon>Sort
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Time (new to old)</MenuItem>
            <MenuItem onClick={handleClose}>Time (old to new)</MenuItem>
          </Menu>
          <Box sx={{ margin: 'auto', display: 'flex', opacity: '0.95' }}>
            <Box sx={{ width: '50%', margin: 'auto' }}>
              {sampleData.map((e, i) => {
                return (
                  <MyQesCard
                    key={'resultCard' + i}
                    data={e}
                  ></MyQesCard>
                );
              })}
            </Box>
            <Box
              sx={{
                width: '40%',
              }}
            >
            <List></List>

            </Box>
          </Box>
        </TabPanel>
      </Box>
    </>
  );
}
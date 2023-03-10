import * as React from 'react';
import Navbar from '../NavBar/Navbar';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import { guideDetail, thumbUp, unThumbUp, getArticleComments, newArticleComment } from '../../service'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { Box } from '@mui/material';
import styles from './App.module.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import CommentIcon from '@mui/icons-material/Comment';
import { Editor } from '@tinymce/tinymce-react';
import Collapse from '@mui/material/Collapse';
import SharePopup from '../SharePopup/SharePopup'
import draftToHtml from 'draftjs-to-html';
import GuideAnswerCard from './GuideAnswerCard'
import useMediaQuery from '@mui/material/useMediaQuery';
import AvatarTrigger from '../MessagerTrigger/Avatar'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
// eslint-disable-next-line space-before-function-paren
export default function VerticalTabs() {
  const { number } = useParams();
  const [data, setData] = React.useState({ 0: { title: 'none' }, 1: { title: 'none' } })
  const [activeStep, setActiveStep] = React.useState(0);
  const [commentExpanded, setCommentExpanded] = React.useState(false);
  const navigate = useNavigate()
  const handleCommentClick = () => {
    setCommentExpanded(!commentExpanded);
  };
  const matchesPad = useMediaQuery(
    '(max-width: 950px)'
  )
  const [social, setSocial] = React.useState(false);

  const [content, setContent] = React.useState('')
  function handleChange (contentt, editor) {
    setContent(contentt.replace(/<[^>]+>/g, ''))
  }
  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  const hendleThumb = async () => {
    if (data[0]?.thumb_up_by?.find((e) => e === parseInt(localStorage.getItem('user_id')))) {
      try {
        const response = await unThumbUp(number, localStorage.getItem('token'), localStorage.getItem('user_id'))
        setData(response.data.article)
      } catch (error) {

      }
    } else {
      try {
        const response = await thumbUp(number, localStorage.getItem('token'), localStorage.getItem('user_id'))
        setData(response.data.article)
      } catch (error) {

      }
    }
  }
  const [score, setScore] = React.useState('');
  const Submit = () => {
    newArticleComment({ content, score }, localStorage.getItem('token'), localStorage.getItem('user_id'), number)
    setScore(null)
    window.location.reload(false);
  }
  const [articleData, setArticleData] = React.useState([{ }]);
  React.useEffect(async () => {
    /*     console.log(number, localStorage.getItem('user_id'), localStorage.getItem('token'))
 */ try {
      const response = await guideDetail(localStorage.getItem('user_id'), localStorage.getItem('token'), number)
      setData(Object.fromEntries(Object.entries(response.data.article)))
      const resp = await getArticleComments(localStorage.getItem('user_id'), localStorage.getItem('token'), number)
      setArticleData(Object.fromEntries(Object.entries(resp.data)));
    } catch (error) {}
  }, [])
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
  <div className="home">
  {localStorage.getItem('token')
    ? (
    <LoggedNarbar></LoggedNarbar>
      )
    : (
    <Navbar></Navbar>
      )}
      <Box>
      <Button variant="outlined" startIcon={<ArrowBackRoundedIcon/>} sx={{ top: 120, position: 'absolute', zIndex: '8', height: 'max-content', fontFamily: 'Roboto', color: '#1976d2 !important', ml: 2 }}onClick={(e) => {
        e.preventDefault()
        navigate('/main')
      }}> Return </Button>
        </Box>
      <Box sx={{ display: 'flex' }}>
      <Box className={styles.guideDetail} sx={{ width: matchesPad ? '90%' : '70%' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], cursor: 'pointer' }} onClick={handleClickProfile}>
            R
          </Avatar>
        }
            title={data[0].user_name}
            subheader={new Date(data[0].time_created * 1000).toLocaleString()}
          />
        <AvatarTrigger user={data[0].author} username={data[0].user_name}setAnchorEl={setAnchorEl} anchorEl={anchorEl}></AvatarTrigger>

        <Box sx={{ width: '95%', margin: 'auto' }}>
          <Stepper nonLinear activeStep={activeStep}>
          {Object.keys(data).map((ele, index) => (

            <Step key={`label${index}`} >
              <StepButton color="inherit" onClick={handleStep(index)}>
                {data[ele].step_title ? data[ele].step_title : 'unknown'}
              </StepButton>
            </Step>
          ))}

          </Stepper>
        </Box>
        {data[activeStep].video &&
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <iframe width="560" height="315" src={data[activeStep].video.replace('https://youtu.be/', 'https://www.youtube.com/embed/')} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>}
        <Card sx={{ width: '95%', border: 'none', margin: 'auto', boxShadow: 'none', height: '32rem', overflow: 'auto', mt: 3 }}>
          <CardContent>
            <Typography variant="h4" color="text.secondary">
            <div dangerouslySetInnerHTML={{ __html: draftToHtml(data[activeStep].content) }}></div>
            </Typography>
          </CardContent>

        </Card>
        <CardActions sx={{ width: '95%', margin: 'auto' }}disableSpacing>
            <IconButton onClick={hendleThumb} aria-label="add to favorites" sx={{ color: data[0]?.thumb_up_by?.find((e) => e === parseInt(localStorage.getItem('user_id'))) ? 'red' : 'grey' } }>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share" onClick={(e) => { e.preventDefault(); setSocial(!social) }}>
              <ShareIcon />
            </IconButton>
            <IconButton onClick={handleCommentClick} aria-label="comment">
          <CommentIcon />
        </IconButton>
          </CardActions>
          <SharePopup opened={social} setOpened={setSocial}></SharePopup>

          <Collapse in={commentExpanded} timeout="auto" unmountOnExit>
      <CardContent>
      <Editor
              toolbar='redo aligncenter alignjustify alignleft alignright blockquote undo bold italic underline code'

    apiKey="yhf0swre6kb5yv1owq7bcxmfxaxwundoc1htcq2tpvhkyz8t"
    value={content.innerText}
    init={{
      height: 300,
      menubar: false
    }}
    onEditorChange={handleChange}
  />
  <br />
  <Button sx={{ mb: 1, float: 'right' }} variant="contained" onClick = {Submit}>Submit</Button>
        </CardContent>
      </Collapse>
      </Box>
        </Box>

  { Object.keys(articleData).map((key) => {
    return (<GuideAnswerCard key={`ele${key}`} data={articleData[key]}></GuideAnswerCard>)
  })
  }
</div>
  )
}

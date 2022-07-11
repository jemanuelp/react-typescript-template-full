import {findDOMNode} from 'react-dom';
import {useState, useEffect, useRef, ChangeEvent, MouseEvent} from 'react';
import {Card, CardTitle, CardHeader, CardBody, Row, Col, Table, Button, Progress, Input} from 'reactstrap';
import Prism from 'prismjs';
import screenfull from 'screenfull';
import ReactPlayer from 'react-player';
import {format} from './utils/Util';

const MediaPlayerControlledVideo = () => {
  const videoRef = useRef<any | null>(null);
  const urlLink = 'http://youtube.com/watch?v=FCPdIvXo2rU';

  const [url, setUrl] = useState<string | null>(urlLink);
  const [played, setPlayed] = useState<number>(0);
  const [loaded, setLoaded] = useState<number>(0);
  const [loop, setLoop] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.75);
  const [duration, setDuration] = useState<number>(0);
  const [seeking, setSeeking] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [controls, setControls] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);

  useEffect(() => {
    Prism.highlightAll();
  });

  const load = (url: string) => {
    setUrl(url);
    setPlayed(0);
    setLoaded(0);
  };
  const handlePlayPause = () => setPlaying(!playing);
  const handleStop = () => {
    setPlaying(false);
    setUrl(null);
  };
  const handleToggleControls = () => {
    setControls(!controls);
    setUrl(null);
  };
  useEffect(() => {
    if (url === null) {
      load(urlLink);
    }
  });
  const handleToggleLoop = () => setLoop(!loop);
  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => setVolume(
    parseFloat(e.target.value),
  );
  const handleToggleMuted = () => setMuted(!muted);
  const handlePlaybackRate = (e: any) => setPlaybackRate(
    parseFloat(e.target.value),
  );
  const handlePlay = () => setPlaying(true);
  const handlePause = () => setPlaying(false);
  const handleSeekMouseDown = () => setSeeking(true);
  const handleSeekChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };
  const handleSeekMouseUp = (e: any) => {
    setSeeking(false);
    if (videoRef) {
      videoRef.current.seekTo(parseFloat(e.target.value));
    }
  };
  const handleProgress = (state: {
        played: number
        playedSeconds: number
        loaded: number
        loadedSeconds: number
    }) => {
    if (!seeking) {
      setPlayed(state.played);
      setLoaded(state.loaded);
    }
  };
  const handleEnded = () => setPlaying(loop);
  const handleDuration = (duration: number) => setDuration(duration);
  const handleFullscreen = () => {
    const domNode = findDOMNode(videoRef.current);
    if (domNode instanceof Element || domNode === undefined) {
      screenfull.request(domNode);
    }
  };

  // for duration, elapsed and remaining time
  const Duration = ({seconds}: { seconds: number }) => {
    return (
      <time dateTime={`P${Math.round(seconds)}S`}>
        {format(seconds)}
      </time>
    );
  };
  const preDuration = <Duration seconds={duration}></Duration>;
  const preElapsed = <Duration seconds={duration * played}></Duration>;
  const preRemaining = <Duration seconds={duration * (1 - played)}></Duration>;

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Controlled Video</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col xs={12}>
            <ReactPlayer
              ref={videoRef}
              url={url ?? ''}
              className='react-player-video'
              width='100%'
              playing={playing}
              controls={controls}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={handleEnded}
              onProgress={handleProgress}
              onDuration={handleDuration}
              config={{
                youtube: {
                  embedOptions: {
                    'allow-same-origin': true,
                  },
                },
              }}
            />
          </Col>
        </Row>
      </CardBody>
      <Table borderless>
        <tbody>
          <tr>
            <td className='text-end'>Controls</td>
            <td>
              <Button color='primary' outline onClick={handleStop} className='my-25 me-50'>
                            Stop
              </Button>
              <Button color='primary' outline onClick={handlePlayPause} className='my-25 me-50'>
                {playing ? 'Pause' : 'Play'}
              </Button>
              <Button color='primary' outline onClick={handleFullscreen} className='my-25'>
                            Fullscreen
              </Button>
            </td>
          </tr>
          <tr>
            <td className='text-end'>Speed</td>
            <td>
              <Button
                color='primary'
                outline
                onClick={handlePlaybackRate}
                value={1}
                className='my-25 me-50'
                active={playbackRate === 1}
              >
                            1x
              </Button>
              <Button
                color='primary'
                outline
                onClick={handlePlaybackRate}
                value={1.5}
                className='my-25 me-50'
                active={playbackRate === 1.5}
              >
                            1.5x
              </Button>
              <Button color='primary' outline onClick={handlePlaybackRate} value={2}
                active={playbackRate === 2}>
                            2x
              </Button>
            </td>
          </tr>
          <tr>
            <td className='text-end'>Seek</td>
            <td>
              <input
                type='range'
                min={0}
                max={0.999999}
                step='any'
                value={played}
                onMouseDown={handleSeekMouseDown}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
              />
            </td>
          </tr>
          <tr>
            <td className='text-end'>Volume</td>
            <td>
              <input type='range' min={0} max={1} step='any' value={volume} onChange={handleVolumeChange}/>
            </td>
          </tr>
          <tr>
            <td className='text-end'>Controls</td>
            <td>
              <div className='form-check'>
                <Input type='checkbox' id='videoControls' checked={controls}
                  onChange={handleToggleControls}/>
              </div>
            </td>
          </tr>
          <tr>
            <td className='text-end'>Muted</td>
            <td>
              <div className='form-check'>
                <Input type='checkbox' id='videoMuted' checked={muted} onChange={handleToggleMuted}/>
              </div>
            </td>
          </tr>
          <tr>
            <td className='text-end'>Loop</td>
            <td>
              <div className='form-check'>
                <Input type='checkbox' id='videoLoop' checked={loop} onChange={handleToggleLoop}/>
              </div>
            </td>
          </tr>
          <tr>
            <td className='text-end'>Played</td>
            <td>
              <Progress value={played} max={1}/>
            </td>
          </tr>
          <tr>
            <td className='text-end'>Loaded</td>
            <td>
              <Progress value={loaded} max={1}/>
            </td>
          </tr>
        </tbody>
      </Table>

      <CardBody>
        <Row>
          <Col xs={12}>
            <pre className='language-js'>
              <code className='language-js'>
                {`state={
                      playing: ${playing},
                      volume: ${volume.toFixed(2)},
                      played: ${played.toFixed(2)},
                      loaded: ${loaded.toFixed(2)},
                      duration: ${format(preDuration.props.seconds)},
                      elapsed: ${format(preElapsed.props.seconds)},
                      remaining: ${format(preRemaining.props.seconds)}
                    }
                    `}
              </code>
            </pre>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default MediaPlayerControlledVideo;

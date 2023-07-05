/* esLint-disable */

import axios from "axios";
import { useEffect, useState } from "react"
import { Badge, Container, Row, Col, Card, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom";

function Main() {
    let [notices, setNotices] = useState<any[]>([]);
    let [events, setEvents] = useState<any[]>([]);

    let [advIslands, setAdvIslands] = useState<any[]>([]);
    let [advIslandsSt, setAdvIslandsSt] = useState('');
    let [advIslandsRt, setAdvIslandsRt] = useState('');

    let [fieldBossSt, setFieldBossSt] = useState('');
    let [fieldBossRt, setFieldBossRt] = useState('');

    let [chaosGateSt, setChaosGateSt] = useState('');
    let [chaosGateRt, setChaosGateRt] = useState('');

    let [ghostShipSt, setGhostShipSt] = useState('');
    let [ghostShipRt, setGhostShipRt] = useState('');

    let occuWarStimes: string[] = [];
    let [occuWarSt, setOccuWarSt] = useState('');
    let [occuWarRt, setOccuWarRt] = useState('');

    let intervalId :number;

    const token = process.env.REACT_APP_LOA_API_KEY;

    function fmtDateYmd(str :string) {
        let date = new Date(str);
        return date.getFullYear() + '-' + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1)) + "-" + (date.getDate() > 9 ? date.getDate().toString() : "0" + date.getDate().toString());
    }

    function fmtDateMd(str :string) {
        let date = new Date(str);
        return ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1)) + "-" + (date.getDate() > 9 ? date.getDate().toString() : "0" + date.getDate().toString());
    }

    function fmtDateHm(str :string) {
      let date = new Date(str);
      return date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    }

    function calcRemainTime(str: string) {
      let isStart = false;
      let now = new Date();
      let eventSt = new Date(str);
      let diff = (eventSt.getTime() - now.getTime()) / 1000;
      let result :string = '';
      let returnArr = new Array();

      if(diff <= 0) {
        isStart = true;
        returnArr.push(isStart);
        returnArr.push(result);
        return returnArr;
      }

      let hour = Math.floor(diff / 3600);
      let minute = Math.floor((diff / 60) % 60);
      let seconds = Math.floor(diff % 60);

      result = (hour < 10 ? '0' + hour : hour).toString() + ':' + (minute < 10 ? '0' + minute : minute).toString() + ':' + (seconds < 10 ? '0' + seconds : seconds).toString();

      returnArr.push(isStart);
      returnArr.push(result);
      return returnArr;
    }

    function showNotices(data :[]) {
        data.map((data: any, i: number) => {
          data.Date = fmtDateYmd(data.Date);
          return data;
        });

        setNotices(data);
    }

    function showEvents(data :[]) {
        data.map((data: any, i: number) => {
          data.StartDate = fmtDateMd(data.StartDate);
          data.EndDate = fmtDateMd(data.EndDate);
          return data;
        });

        setEvents(data);
    }

    function filterStartToday(arr :[]) {
      let islandsArr :any = [];
      let fieldBossArr :any = [];
      let chaosGateArr :any = [];
      let ghostShipArr :any = [];

      let now = new Date();

      if (now.getDay() == 0 || now.getDay() == 6) {
        occuWarStimes = [
          "12:30",
          "16:30",
          "18:30",
          "19:30",
          "22:30",
          "23:30",
        ];
      }

      if(occuWarStimes.length != 0) {
        let nowTime = fmtDateHm(now.toString());

        for(let i = 0; i < occuWarStimes.length; i++) {
          if(occuWarStimes[i] > nowTime) {
            occuWarSt = occuWarStimes[i];
            setOccuWarSt(occuWarStimes[i]);
            break;
          }
        }
      }

      // console.log(occuWarSt);

      islandsArr = [...arr].filter((data: any, i: number) => {
        return data.CategoryName == '모험 섬';
      });

      fieldBossArr = [...arr].filter((data: any, i: number) => {
        return data.CategoryName == '필드보스';
      }).slice(0, 1);

      fieldBossArr = fieldBossArr.filter((data: any, i: number) => {
        data.StartTimes = data.StartTimes.filter((startTime: string, j: number) => {
          let stToDate = new Date(startTime);
          return (now.getTime() <= stToDate.getTime());
        });

        data.StartTimes = data.StartTimes.slice(0, 1);
        return data;
      });

      chaosGateArr = [...arr].filter((data: any, i: number) => {
        return data.CategoryName == '카오스게이트' && data.MinItemLevel == 1520;
      }).slice(0, 1);

      chaosGateArr = chaosGateArr.filter((data: any, i: number) => {
        data.StartTimes = data.StartTimes.filter((startTime: string, j: number) => {
          let stToDate = new Date(startTime);
          return (now.getTime() <= stToDate.getTime());
        });

        data.StartTimes = data.StartTimes.slice(0, 1);
        return data;
      });

      ghostShipArr = [...arr].filter((data: any, i: number) => {
        return data.CategoryName == '유령선';
      }).slice(0, 1);

      ghostShipArr = ghostShipArr.filter((data: any, i: number) => {
        data.StartTimes = data.StartTimes.filter((startTime: string, j: number) => {
          let stToDate = new Date(startTime);
          return (now.getTime() <= stToDate.getTime());
        });

        data.StartTimes = data.StartTimes.slice(0, 1);
        return data;
      });

      console.log(islandsArr);

      islandsArr = islandsArr.filter((data: any, i: number) => {
        if(data.StartTimes != null) {
          let startTimes = data.StartTimes.filter((startTime: string, j: number) => {
            let stToDate = new Date(startTime);
  
            // return (now.getTime() <= stToDate.getTime()) && (fmtDateYmd(stToDate.toDateString()) == fmtDateYmd(now.toDateString()));
            return (now.getTime() <= stToDate.getTime());
          });

          data.StartTimes = startTimes;
        }

        data.RewardItems = data.RewardItems.filter((rewardItem: any, j: number) => {
          if(rewardItem.StartTimes) {
            rewardItem.StartTimes = rewardItem.StartTimes.filter((startTime: string, k: number) => {
              let stToDate = new Date(startTime);
              return (now.getTime() <= stToDate.getTime()) && (fmtDateYmd(startTime) == fmtDateYmd(now.toDateString()));
            });
            
            if(rewardItem.StartTimes.length > 0) {
              rewardItem.StartTimes = rewardItem.StartTimes.slice(0, 1);
            } else {
              rewardItem = null;
            }
          }

          if(rewardItem) {
            return rewardItem;
          }
        });

        data.RewardItems = data.RewardItems.filter((rewardItem: any, j: number) => {
          return (
            data.RewardItems.findIndex((rewardItem2: any, k: number) => {
              return rewardItem.Name === rewardItem2.Name;
            }) === j
          )
        });

        if(data.StartTimes && data.StartTimes.length > 0) {
          data.StartTimes = data.StartTimes.slice(0, 1);
          return data;
        }
      });
      
      islandsArr.sort((a: any, b: any) => {
        if(a.StartTimes[0] > b.StartTimes[0]) {
          return 1;
        } else {
          return -1;
        }
      });

      islandsArr = islandsArr.slice(0, 3);

      if(chaosGateArr[0].StartTimes.length == 0) {
        let nextChaosGateSt = new Date();
        nextChaosGateSt.setDate(nextChaosGateSt.getDate() + 2);
        nextChaosGateSt.setHours(11);
        nextChaosGateSt.setMinutes(0);
        nextChaosGateSt.setSeconds(0);

        chaosGateArr[0].StartTimes[0] = nextChaosGateSt;
      }

      setAdvIslandsSt(fmtDateHm(islandsArr[0].StartTimes[0]));
      setAdvIslands(islandsArr);

      setFieldBossSt(fmtDateHm(fieldBossArr[0].StartTimes[0]));
      setChaosGateSt(fmtDateHm(chaosGateArr[0].StartTimes[0]));
      setGhostShipSt(fmtDateHm(ghostShipArr[0].StartTimes[0]));

      intervalId = window.setInterval(function () {

        let [islandStart, islandRt] = calcRemainTime(islandsArr[0].StartTimes[0]);
        let [fieldBossStart, fieldBossRt] = calcRemainTime(fieldBossArr[0].StartTimes[0]);
        let [chaosGateStart, chaosGateRt] = calcRemainTime(chaosGateArr[0].StartTimes[0]);
        let [ghostShipStart, ghostShipRt] = calcRemainTime(ghostShipArr[0].StartTimes[0]);
        let [occuWarStart, occuWarRt] = [false, ''];

        if(occuWarStimes.length != 0) {
          let occuWarStSplit = occuWarSt.split(":");
          let occuWarStHour = parseInt(occuWarStSplit[0]);
          let occuWarStMinute = parseInt(occuWarStSplit[1]);
          let occuWarDate = new Date();
          occuWarDate.setHours(occuWarStHour);
          occuWarDate.setMinutes(occuWarStMinute);
          occuWarDate.setSeconds(0);

          // console.log(occuWarDate);

          [occuWarStart, occuWarRt] = calcRemainTime(occuWarDate.toString());
          setOccuWarRt(occuWarRt);
        }

        setAdvIslandsRt(islandRt);
        setFieldBossRt(fieldBossRt);
        setChaosGateRt(chaosGateRt);
        setGhostShipRt(ghostShipRt);

        if (islandStart || fieldBossStart || chaosGateStart || ghostShipStart || occuWarStart) {
          window.clearInterval(intervalId);

          axios.get(
            "https://developer-lostark.game.onstove.com/gamecontents/calendar",
            {
              params: {
                // type: '공지'
              },
              headers: {
                Authorization: "bearer " + token,
              },
            }
          )
          .then(res => {
            showAdvIslands(res.data);
          })
          .catch(err => {
            console.log(err);
          });
        }
      }, 1000);
      
    }

    function showAdvIslands(data :[]) {
      filterStartToday(data);
    }

    useEffect(() => {
        let getNotices = axios.get('https://developer-lostark.game.onstove.com/news/notices', {
            params: {
                // type: '공지'
            },
            headers: {
                Authorization: 'bearer ' + token
            }
        });

        let getEvents = axios.get('https://developer-lostark.game.onstove.com/news/events', {
            params: {
                // type: '공지'
            },
            headers: {
                Authorization: 'bearer ' + token
            }
        });

        let getAdvIslands = axios.get('https://developer-lostark.game.onstove.com/gamecontents/calendar', {
            params: {
                // type: '공지'
            },
            headers: {
                Authorization: 'bearer ' + token
            }
        });

        axios.all([getNotices, getEvents, getAdvIslands])
            .then(
                axios.spread((res1, res2, res3) => {
                  let tmpNotices = res1.data.slice(0, 5);
                  showNotices(tmpNotices);

                  let tmpEvents = res2.data.slice(0, 3);
                  showEvents(tmpEvents);

                  let tmpAdvIslands = res3.data;
                  showAdvIslands(tmpAdvIslands);
                })
            )
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>공지사항</Card.Title>
                </Card.Body>
                <ListGroup variant="flush">
                  {notices.map((data, i) => {
                    return (
                      <Link
                        to={data.Link}
                        key={i}
                        style={{ textDecoration: "none" }}
                      >
                        <ListGroup.Item key={i}>
                          {data.Title} <br />
                          <Badge bg="dark">{data.Type}</Badge> {data.Date}
                        </ListGroup.Item>
                      </Link>
                    );
                  })}
                </ListGroup>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>이벤트</Card.Title>
                </Card.Body>
                <ListGroup variant="flush">
                  {events.map((data, i) => {
                    return (
                      <Link
                        to={data.Link}
                        key={i}
                        style={{ textDecoration: "none" }}
                      >
                        <ListGroup.Item key={i}>
                          <img src={data.Thumbnail} style={{ width: "100%" }} />{" "}
                          <br />
                          {data.StartDate} ~ {data.EndDate}
                        </ListGroup.Item>
                      </Link>
                    );
                  })}
                </ListGroup>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>모험 섬  { advIslandsSt }  { advIslandsRt }</Card.Title>
                </Card.Body>
                <ListGroup variant="flush">
                  {advIslands.map((data, i) => {
                    return (
                      <ListGroup.Item key={i}>
                        <img src={data.ContentsIcon} style={{ width: "10%" }} /> {data.ContentsName} <br />
                        {
                          data.RewardItems.map((rewardItem :any, j :number) => {
                            return (
                              <img src={rewardItem.Icon} style={{ width: "10%" }} key={j} />
                            )
                          })
                        }
                      </ListGroup.Item>
                    );
                  })}
                  <ListGroup.Item>
                    필드 보스 {fieldBossSt} {fieldBossRt}
                  </ListGroup.Item>
                  <ListGroup.Item>
                     카오스 게이트 { chaosGateSt } { chaosGateRt }
                  </ListGroup.Item>
                  <ListGroup.Item>
                    유령선 { ghostShipSt } { ghostShipRt }
                  </ListGroup.Item>
                  {
                    occuWarSt == '' ? null
                    :
                    <ListGroup.Item>
                      점령 이벤트 { occuWarSt } { occuWarRt }
                    </ListGroup.Item>
                  }
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
}

export default Main;
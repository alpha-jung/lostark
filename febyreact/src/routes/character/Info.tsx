import axios from "axios";
import { useEffect, useState } from "react";
import { Badge, Card, Col, Container, Nav, Row, ProgressBar } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Battle from "./Battle";
import Naesil from "./Naesil"; 
import Loading from "../../Loading";
import Avatar from "./Avatar";
import Characters from "./Characters";

function CharacterInfo() {
    const token = process.env.REACT_APP_LOA_API_KEY;
    let { name } = useParams();
    let [ characterInfo, setCharacterInfo ] = useState<CharacterInfo>();
    let [ tab, setTab ] = useState('battle');

    // let getInfo = axios.get(`https://developer-lostark.game.onstove.com/armories/characters/${name}`,
    //     {
    //         params: {

    //         },
    //         headers: {
    //             Authorization: 'bearer ' + token
    //         }
    //     })
    //     .then((res) => {
    //         // console.log(res);

    //         // setCharacterInfo(res.data);
    //         return res.data;
    //     });

    let getInfo = axios.all(
      [
        axios.get(`https://developer-lostark.game.onstove.com/armories/characters/${name}`, 
          {
            params: {},
            headers: {
              Authorization: 'bearer ' + token
            }
          }
        ),
        axios.get(`https://developer-lostark.game.onstove.com/characters/${name}/siblings`, 
          {
            params: {},
            headers: {
              Authorization: 'bearer ' + token
            }
          }
        )
      ]
    )
    .then(
      axios.spread((res1, res2) => {
        if(res1.data == null && res2.data == null) {
          return null;
        } else {
          let obj: any = new Object();

          if(res1.data != null) {
            for (let key in res1.data) {
              obj[key] = res1.data[key];
            }
          }
          
          if(res2.data != null) {
            obj.Characters = res2.data;
          }

          return obj;
        }
        
        
      })
    )

    const { data, isLoading, isError } = useQuery('getInfo', () => getInfo, {});

    useEffect(() => {
        // let getInfo = axios.get(`https://developer-lostark.game.onstove.com/armories/characters/${name}`,
        // {
        //     params: {

        //     },
        //     headers: {
        //         Authorization: 'bearer ' + token
        //     }
        // })
        // .then(res => {
        //     console.log(res);

        //     setCharacterInfo(res.data);
        // })
        // .catch(err => {
        //     console.log(err);
        // });

        if(data) {
          console.log(data);
          setCharacterInfo(data);
        }

    }, [data])

    return (
      <Container>
        {
          isLoading ? <Loading></Loading>
          :
          typeof characterInfo == 'undefined' || (characterInfo != null && Object.keys(characterInfo).length === 0 && characterInfo.constructor === Object) ? (
          <h5>해당 이름을 가진 캐릭터가 없습니다.</h5>
        ) : (
          <Card>
            <Card className="bg-dark text-white">
              <Card.Img
                src={characterInfo?.ArmoryProfile?.CharacterImage ?? ""}
                style={{ width: "100%", height: "50vh" }}
              />
              <Card.ImgOverlay>
                <Card.Text>
                  <Row>
                    <Col sm={6} className="col-left">
                      <Badge bg="secondary">
                        {characterInfo?.ArmoryProfile?.ServerName ?? ""}
                      </Badge>{" "}
                      <Badge bg="secondary">
                        {characterInfo?.ArmoryProfile?.CharacterClassName ?? ""}
                      </Badge>
                      <br />
                      <br />
                      <br />
                      {name} <br />
                      {characterInfo?.ArmoryProfile?.Title}
                      <br />
                      <br />
                      <br />
                      아이템 {characterInfo?.ArmoryProfile?.ItemMaxLevel} <br />
                      전투 Lv.{characterInfo?.ArmoryProfile?.CharacterLevel}{" "}
                      <br />
                      원정대 Lv.{characterInfo?.ArmoryProfile?.ExpeditionLevel}
                    </Col>
                    <Col sm={6} className="col-right">
                      <br />
                      <br />
                      <br />
                      {characterInfo?.ArmoryProfile?.GuildName}{" "}
                      <Badge bg="secondary">길드</Badge> <br />
                      Lv.{characterInfo?.ArmoryProfile?.TownLevel}{" "}
                      {characterInfo?.ArmoryProfile?.TownName}{" "}
                      <Badge bg="secondary">영지</Badge> <br />
                      {characterInfo?.ArmoryProfile?.PvpGradeName}{" "}
                      <Badge bg="secondary">PVP</Badge> <br />
                    </Col>
                  </Row>
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
            <Card>
              <Card.Header>
                <Nav variant="tabs" defaultActiveKey="battle">
                  <Nav.Item>
                    <Nav.Link eventKey='battle' onClick={() => { setTab('battle') }}>전투</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='naesil' onClick={() => { setTab('naesil') }}>내실</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='avatar' onClick={() => { setTab('avatar') }}>아바타</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='stat' onClick={() => { setTab('stat') }}>통계</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='characters' onClick={() => { setTab('characters') }}>보유 캐릭터</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='guild' onClick={() => { setTab('guild') }}>길드</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
            </Card>
            {
              tab == 'battle' ?
              <Battle data={characterInfo}></Battle>
              : null
            }
            {
              tab == 'naesil' ?
              <Naesil data={characterInfo}></Naesil>
              : null
            }
            {
              tab == 'avatar' ?
              <Avatar data={characterInfo}></Avatar>
              : null
            }
            {
              tab == 'characters' ?
              <Characters data={characterInfo}></Characters>
              : null
            }
          </Card>
        )}
      </Container>
    );
}

export default CharacterInfo;
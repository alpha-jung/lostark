import axios from "axios";
import { useEffect, useState } from "react";
import { Badge, Card, Col, Container, Nav, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

function CharacterInfo() {
    const token = process.env.REACT_APP_LOA_API_KEY;

    type ArmoryProfile = {
        CharacterClassName: string | undefined | null,
        CharacterImage: string | undefined | null,
        CharacterLevel: number | undefined | null,
        CharacterName: string | undefined | null,
        ExpeditionLevel: number | undefined | null,
        GuildMemberGrade: string | undefined | null,
        GuildName: string | undefined | null,
        ItemAvgLevel: string | undefined | null,
        ItemMaxLevel: string | undefined | null,
        PvpGradeName: string | undefined | null,
        ServerName: string | undefined | null,
        Stats?: any[],
        Tendencies?: any[],
        Title: string | undefined | null,
        TotalSkillPoint: number | undefined | null,
        TownLevel: number | undefined | null,
        TownName: string  | undefined | null,
        UsingSkillPoint: number  | undefined | null
    }

    type CharacterInfo = {
        ArmoryAvtars?: any[],
        ArmoryCard?: {
            Cards?: any[],
            Effects?: any[]
        },
        ArmoryEngraving?: {
            Effects?: any[],
            Engraving?: any[]
        },
        ArmoryEquipment?: any[],
        ArmoryGem?: {
            Effects?: any[],
            Gems?: any[]
        },
        ArmoryProfile?: ArmoryProfile,
        ArmorySkills?: any[],
        Collectibles?: any[],
        ColosseumInfo?: any
    }

    let { name } = useParams();
    let [ characterInfo, setCharacterInfo ] = useState<CharacterInfo>({});

    useEffect(() => {
        // axios.get(`https://developer-lostark.game.onstove.com/characters/${name}/siblings`,
        // {
        //     params: {
        //      // type: '공지'
        //     },
        //     headers: {
        //         Authorization: 'bearer ' + token
        //     }
        // })
        // .then(res => {
        //     console.log(res);
            
        //     characters = res.data;
        // })
        // .catch(err => {
        //     console.log(err);
        // });

        axios.get(`https://developer-lostark.game.onstove.com/armories/characters/${name}`,
        {
            params: {

            },
            headers: {
                Authorization: 'bearer ' + token
            }
        })
        .then(res => {
            console.log(res);

            setCharacterInfo(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, [name])

    return (
      <>
        <Container>
          {!characterInfo ? (
            <h5>해당 이름을 가진 캐릭터가 없습니다.</h5>
          ) : (
            <>
              <Card className="bg-dark text-white">
                <Card.Img
                  src={characterInfo.ArmoryProfile?.CharacterImage ?? ""}
                  style={{ width: "100%", height: "50vh" }}
                />
                <Card.ImgOverlay>
                  <Card.Text>
                    <Row>
                      <Col sm={6} className="col-left">
                        <Badge bg="secondary">
                          {characterInfo.ArmoryProfile?.ServerName ?? ""}
                        </Badge>{" "}
                        <Badge bg="secondary">
                          {characterInfo.ArmoryProfile?.CharacterClassName ??
                            ""}
                        </Badge>
                        <br />
                        <br />
                        <br />
                        <h3>{name}</h3>
                        {characterInfo.ArmoryProfile?.Title}
                        <br />
                        <br />
                        <br />
                        아이템 {characterInfo.ArmoryProfile?.ItemMaxLevel}{" "}
                        <br />
                        전투 Lv.{
                          characterInfo.ArmoryProfile?.CharacterLevel
                        }{" "}
                        <br />
                        원정대 Lv.{characterInfo.ArmoryProfile?.ExpeditionLevel}
                      </Col>
                      <Col sm={6} className="col-right">
                        <br />
                        <br />
                        <br />
                        {characterInfo.ArmoryProfile?.GuildName}{" "}
                        <Badge bg="secondary">길드</Badge> <br />
                        Lv.{characterInfo.ArmoryProfile?.TownLevel}{" "}
                        {characterInfo.ArmoryProfile?.TownName}{" "}
                        <Badge bg="secondary">영지</Badge> <br />
                        {characterInfo.ArmoryProfile?.PvpGradeName}{" "}
                        <Badge bg="secondary">PVP</Badge> <br />
                      </Col>
                    </Row>
                  </Card.Text>
                </Card.ImgOverlay>
              </Card>
              <Card>
                <Card.Header>
                  <Nav variant="tabs" defaultActiveKey="#first">
                    <Nav.Item>
                      <Nav.Link href="#first">전투</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link href="#link">내실</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link href="#disabled">아바타</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link href="#oh">통계</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link href="#oh">캐릭터</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link href="#oh">길드</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
              </Card>
              <Card>
                <Row>
                  <Col sm={4}>
                    <Card.Body>
                        <Row>
                            <Col sm={6}>
                                <h6>아이템</h6>
                                <h5>{characterInfo.ArmoryProfile?.ItemMaxLevel}</h5>
                            </Col>
                            <Col sm={6}>
                                <h6>전투</h6>
                                <h5>{characterInfo.ArmoryProfile?.CharacterLevel}</h5>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col sm={6}>
                                <h6>특화</h6>
                                <h5></h5>
                                <h6>특성합</h6>
                                <h6>공격력</h6>
                                <h6>최대 생명력</h6>
                            </Col>
                            <Col sm={6}>

                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                {
                                    characterInfo.ArmoryEngraving?.Effects ?
                                        characterInfo.ArmoryEngraving.Effects.map((data) => {
                                            return (
                                                <div>
                                                    { data.Name }
                                                </div>
                                            )
                                        })
                                    : null
                                }
                            </Col>
                        </Row>
                    </Card.Body>
                  </Col>
                  <Col sm={8}>

                  </Col>
                </Row>
              </Card>
            </>
          )}
        </Container>
      </>
    );
}

export default CharacterInfo;
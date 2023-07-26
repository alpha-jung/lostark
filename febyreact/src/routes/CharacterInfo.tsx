import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { Badge, Card, Col, Container, Nav, Row, ProgressBar } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { JsxElement } from "typescript";

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

    function removeTag(str: string) {
      return str.replace(/<[^>]*>?/g, '');
    }

    function setCardEffect(data: any) {
      let cards = data.Cards;
      let effects = data.Effects[0];

      cards.forEach((card: any, i: number) => {
        cardEffectCount += card.AwakeTotal;
      });

      setCardEffectCount(cardEffectCount);
      setCardEffectSize(effects.Items.length);

      let idx = effects.Items[0].Name.search(/[0-9]/g);
      setCardEffectName(effects.Items[0].Name.substring(0, idx));
    }

    function setGem(data: any) {
      let gemEffects = data.Effects.sort((a: any, b: any) => {
        return a.GemSlot - b.GemSlot;
      });

      data.Gems.forEach((data: any, i: number) => {
        let obj: any = new Object();
        obj.Name = removeTag(data.Name);
        obj.Effect = gemEffects[i];
        obj.Level = data.Level;
        obj.Icon = data.Icon;

        if(obj.Name.indexOf('멸화') > -1) {
          mhGem.push(obj);
        } else {
          hyGem.push(obj);
        }
      });
    }

    function setSkills(data: any) {
      let tmp: any[] = [];

      data.map((skill: any, i: number) => {
        if(!skill.IsAwakening && (skill.Rune != null || skill.Level > 1)) {
          skill.Tripods = skill.Tripods.filter((tp: any) => {
            return tp.IsSelected;
          });

          tmp.push(skill);
        }
      });

      console.log(tmp);
      setUsingSkills(tmp);
    }

    let { name } = useParams();
    let [ characterInfo, setCharacterInfo ] = useState<CharacterInfo>({});
    let [ cardEffctName, setCardEffectName ] = useState('');
    let [ cardEffectSize, setCardEffectSize ] = useState(0);
    let [ cardEffectCount, setCardEffectCount ] = useState(0);
    let [ mhGem, setMhGem ] = useState<any[]>([]);
    let [ hyGem, setHyGem ] = useState<any[]>([]);
    let [ usingSkills, setUsingSkills ] = useState<any[]>([]);

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
            setCardEffect(res.data.ArmoryCard);
            setGem(res.data.ArmoryGem);
            setSkills(res.data.ArmorySkills);
            
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
                        {name} <br />
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
                      <Nav.Link href="#ya">캐릭터</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link href="#ho">길드</Nav.Link>
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
                          {characterInfo.ArmoryProfile?.Stats?.map(
                            (data: any, i: number) => {
                              return (
                                <p key={i} style={{ fontSize: "14px" }}>
                                  {data.Type}
                                </p>
                              );
                            }
                          )}
                        </Col>
                        <Col sm={6}>
                          {characterInfo.ArmoryProfile?.Stats?.map(
                            (data: any, i: number) => {
                              return (
                                <p key={i} style={{ fontSize: "14px" }}>
                                  {data.Value}
                                </p>
                              );
                            }
                          )}
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col>
                          {characterInfo.ArmoryEngraving?.Effects
                            ? characterInfo.ArmoryEngraving.Effects.map(
                                (data: any, i: number) => {
                                  return <p key={i}>{data.Name}</p>;
                                }
                              )
                            : null}
                        </Col>
                      </Row>
                    </Card.Body>
                  </Col>
                  <Col sm={8}>
                    <Card.Body>
                      <Row>
                        <Col>
                          장비 <br />
                          {characterInfo.ArmoryEquipment?.map(
                            (data: any, i: number) => {
                              if (i >= 0 && i <= 5) {
                                let toolTip = JSON.parse(data.Tooltip);
                                let equipQuality =
                                  toolTip.Element_001.value.qualityValue;
                                let equipLevel = removeTag(
                                  toolTip.Element_000.value
                                )
                                  .split(" ")[0]
                                  .replace("+", "");

                                // console.log(toolTip);

                                return (
                                  <div style={{ float: "left" }} key={i}>
                                    <img src={data.Icon} />
                                    <ProgressBar
                                      now={equipQuality}
                                      label={`${equipQuality}`}
                                    ></ProgressBar>
                                    <Badge bg="secondary">
                                      {data.Type} {equipLevel}
                                    </Badge>
                                  </div>
                                );
                              }
                            }
                          )}
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col>
                          장신구 <br />
                          {characterInfo.ArmoryEquipment?.map(
                            (data: any, i: number) => {
                              if (i >= 6 && i <= 12) {
                                let toolTip = JSON.parse(data.Tooltip);
                                let equipQuality =
                                  toolTip.Element_001.value.qualityValue;
                                let stoneEffect = "";
                                let braceletOption = "";

                                if (data.Type == "어빌리티 스톤") {
                                  let stoneEffectObj =
                                    toolTip.Element_006.value.Element_000
                                      .contentStr;

                                  for (let key in stoneEffectObj) {
                                    let stoneEffectSplit = removeTag(
                                      stoneEffectObj[key].contentStr
                                    ).split(" ");
                                    stoneEffect += stoneEffectSplit[
                                      stoneEffectSplit.length - 1
                                    ].replace("+", "");
                                  }
                                }

                                if (data.Type == "팔찌") {
                                  // let braceletOptionVal = removeTag(toolTip.Element_004.value.Element_001);
                                  // console.log(braceletOptionVal);

                                  braceletOption =
                                    toolTip.Element_004.value.Element_001;
                                }

                                console.log(toolTip);

                                return (
                                  <div style={{ float: "left" }} key={i}>
                                    <img src={data.Icon} />
                                    {equipQuality != -1 ? (
                                      <ProgressBar
                                        now={equipQuality}
                                        label={`${equipQuality}`}
                                      ></ProgressBar>
                                    ) : null}
                                    {data.Type == "어빌리티 스톤" ? (
                                      <ProgressBar
                                        now={parseInt(stoneEffect)}
                                        label={`${stoneEffect}`}
                                      ></ProgressBar>
                                    ) : null}
                                    {data.Type == "팔찌" ? (
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: braceletOption,
                                        }}
                                      ></div>
                                    ) : null}
                                    <Badge bg="secondary">{data.Type}</Badge>
                                  </div>
                                );
                              }
                            }
                          )}
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col sm={6}>
                          보석 <br />
                          {mhGem.map((data: any, i: number) => {
                            return (
                              <div
                                style={{
                                  width: "9%",
                                  textAlign: "center",
                                  display: "inline-block",
                                }}
                                key={i}
                              >
                                <img
                                  src={data.Icon}
                                  style={{ width: "100%" }}
                                />
                                <Badge bg="secondary">{data.Level}</Badge>
                              </div>
                            );
                          })}
                          <div>
                            <Badge bg="secondary">멸</Badge>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <br />
                          {hyGem.map((data: any, i: number) => {
                            return (
                              <div
                                style={{
                                  width: "9%",
                                  textAlign: "center",
                                  display: "inline-block",
                                }}
                                key={i}
                              >
                                <img
                                  src={data.Icon}
                                  style={{ width: "100%" }}
                                />
                                <Badge bg="secondary">{data.Level}</Badge>
                              </div>
                            );
                          })}
                          <div>
                            <Badge bg="secondary">홍</Badge>
                          </div>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col>
                          카드 <br />
                          {characterInfo.ArmoryCard?.Cards?.map(
                            (data: any, i: number) => {
                              return (
                                <div
                                  style={{
                                    float: "left",
                                    width: "16%",
                                    textAlign: "center",
                                    fontSize: "5px",
                                  }}
                                  key={i}
                                >
                                  <img
                                    src={data.Icon}
                                    style={{ width: "100%" }}
                                  />
                                  <p>{data.Name}</p>
                                </div>
                              );
                            }
                          )}
                          {
                            <Card.Body>
                              <Card.Title style={{ textAlign: "left" }}>
                                {cardEffctName}
                              </Card.Title>
                              <Card.Text>
                                <Badge bg="secondary">
                                  {cardEffectSize}세트
                                </Badge>
                                <Badge bg="secondary">
                                  {cardEffectCount}각
                                </Badge>
                              </Card.Text>
                            </Card.Body>
                          }
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Row>
                          <Col>
                            스킬{" "}
                            <Badge bg="secondary">
                              SP {characterInfo.ArmoryProfile?.UsingSkillPoint}{" "}
                              / {characterInfo.ArmoryProfile?.TotalSkillPoint}
                            </Badge>{" "}
                            <br />
                          </Col>
                        </Row>
                        {usingSkills.length != 0 ? (
                          <Row>
                            {
                              usingSkills.slice(0, 3).map((data: any, i: number) => {
                                return (
                                  <Col sm={4} key={i}>
                                    <div>
                                      <img
                                        src={usingSkills[i].Icon}
                                        style={{ width: "2vw" }}
                                      />
                                      {usingSkills[i].Name}
                                      {usingSkills[i].Level}
                                    </div>
                                    {usingSkills[i].Tripods.map(
                                      (tp: any, j: number) => {
                                        return (
                                          <div key={j}>
                                            <p>
                                              {tp.Level} {tp.Name}
                                            </p>
                                          </div>
                                        );
                                      }
                                    )}
                                  </Col>
                                );
                              })
                            }
                          </Row>
                        ) : null}
                      </Row>
                    </Card.Body>
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
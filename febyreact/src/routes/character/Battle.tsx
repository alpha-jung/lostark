import { removeTag } from "../../util"
import { useEffect, useState } from "react"
import { Badge, Card, Col, Row, ProgressBar } from "react-bootstrap";

function Battle({ data }: {data: CharacterInfo | undefined}) {
    let [characterInfo, setCharacterInfo] = useState<CharacterInfo>();
    let [equipment, setEquipment] = useState<ArmoryEquipment[]>([]);
    let [accessories, setAccessories] = useState<ArmoryEquipment[]>([]);
    let [cardEffctName, setCardEffectName] = useState("");
    let [cardEffectSize, setCardEffectSize] = useState(0);
    let [cardEffectCount, setCardEffectCount] = useState(0);
    let [mhGem, setMhGem] = useState<Gem[]>([]);
    let [hyGem, setHyGem] = useState<Gem[]>([]);
    let [usingSkills, setUsingSkills] = useState<ArmorySkills[]>([]);

    function setArmoryEquipment(data: ArmoryEquipment[]) {
        let equipArr: ArmoryEquipment[] = [];
        let accesArr: ArmoryEquipment[] = [];
        
        data.map((e: ArmoryEquipment, i: number) => {
            if(
                e.Type == '무기'
                || e.Type == '투구'
                || e.Type == '상의'
                || e.Type == '하의'
                || e.Type == '장갑'
                || e.Type == '어깨'
            ) {
                equipArr.push(e);
            } else if(
                e.Type == '목걸이'
                || e.Type == '귀걸이'
                || e.Type == '반지'
                || e.Type == '어빌리티 스톤'
                || e.Type == '팔찌'
            ) {
                accesArr.push(e);
            }
        });

        setEquipment(equipArr);
        setAccessories(accesArr);
    }

    function setCardEffect(data: ArmoryCard) {
      let cards = typeof data.Cards === 'undefined' ? [] : data.Cards;
      let effects = typeof data.Effects[0] === 'undefined' ? null : data.Effects[0];

      cards.forEach((card: Cards, i: number) => {
        cardEffectCount += card.AwakeTotal;
      });

      setCardEffectCount(cardEffectCount);

      if(effects != null) {
        setCardEffectSize(effects.Items.length);

        let idx = effects.Items[0].Name.search(/[0-9]/g);
        setCardEffectName(effects.Items[0].Name.substring(0, idx));
      }
    }

    function setGem(data: ArmoryGem) {
      let gemEffects = data.Effects?.sort((a: GemEffect, b: any) => {
        return a.GemSlot - b.GemSlot;
      });

      let tmpMhGem: Gem[] = [];
      let tmpHyGem: Gem[] = [];

      data.Gems.forEach((data: Gem, i: number) => {
        let obj: any = new Object();
        obj.Name = removeTag(data.Name);
        obj.Effect = gemEffects[i];
        obj.Level = data.Level;
        obj.Icon = data.Icon;

        if (obj.Name.indexOf("멸화") > -1) {
          tmpMhGem.push(obj);
        } else {
          tmpHyGem.push(obj);
        }
      });

      setMhGem(tmpMhGem);
      setHyGem(tmpHyGem);
    }

    function setSkills(data: ArmorySkills[]) {
      let tmp: ArmorySkills[] = [];

      data.map((skill: ArmorySkills, i: number) => {
        if (!skill.IsAwakening && (skill.Rune != null || skill.Level > 1)) {
          skill.Tripods = skill.Tripods.filter((tp: any) => {
            return tp.IsSelected;
          });

          tmp.push(skill);
        }
      });

      setUsingSkills(tmp);
    }

    useEffect(() => {
      if(typeof data != 'undefined') {
        console.log(data);
        setCharacterInfo(data);

        if(data.ArmoryEquipment != null) {
            setArmoryEquipment(data.ArmoryEquipment);
        }

        if(data.ArmoryCard != null) {
            setCardEffect(data.ArmoryCard);
        }
        
        if(data.ArmoryGem != null) {
            setGem(data.ArmoryGem);
        }

        setSkills(data.ArmorySkills);
      }
    }, [data]);
    
    return (
      <>
        <Card>
          <Row>
            <Col sm={4}>
              <Card.Body>
                <Row>
                  <Col sm={6}>
                    <h6>아이템</h6>
                    <h5>{characterInfo?.ArmoryProfile.ItemMaxLevel}</h5>
                  </Col>
                  <Col sm={6}>
                    <h6>전투</h6>
                    <h5>{characterInfo?.ArmoryProfile.CharacterLevel}</h5>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm={6}>
                    {characterInfo?.ArmoryProfile.Stats.map(
                      (data: Stats, i: number) => {
                        return (
                          <p key={i} style={{ fontSize: "14px" }}>
                            {data.Type}
                          </p>
                        );
                      }
                    )}
                  </Col>
                  <Col sm={6}>
                    {characterInfo?.ArmoryProfile.Stats.map(
                      (data: Stats, i: number) => {
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
                    {characterInfo?.ArmoryEngraving.Effects.map(
                          (data: Item, i: number) => {
                            return <p key={i}>{data.Name}</p>;
                          }
                        )
                    }
                  </Col>
                </Row>
              </Card.Body>
            </Col>
            <Col sm={8}>
              <Card.Body>
                <Row>
                  <Col>
                    장비 <br />
                    {/* {characterInfo.ArmoryEquipment?.slice(0, 6).map( */}
                    {equipment.map(
                      (data: ArmoryEquipment, i: number) => {
                          let toolTip = JSON.parse(data.Tooltip);
                          let equipQuality =
                            toolTip.Element_001.value.qualityValue;
                          let equipLevel = removeTag(toolTip.Element_000.value)
                            .split(" ")[0]
                            .replace("+", "");

                        //   console.log(toolTip);

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
                    )}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    장신구 <br />
                    {/* {characterInfo.ArmoryEquipment?.slice(6, 13).map( */}
                    {accessories.map(
                      (data: ArmoryEquipment, i: number) => {
                          let toolTip = JSON.parse(data.Tooltip);
                          let equipQuality =
                            toolTip.Element_001.value.qualityValue;
                          let stoneEffect = "";
                          let braceletOption = "";

                          if (data.Type == "어빌리티 스톤") {
                            let stoneEffectObj =
                              toolTip.Element_006.value.Element_000.contentStr;

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

                          // console.log(toolTip);

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
                    )}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm={6}>
                    보석 <br />
                    {mhGem.map((data: Gem, i: number) => {
                      return (
                        <div
                          style={{
                            width: "9%",
                            textAlign: "center",
                            display: "inline-block",
                          }}
                          key={i}
                        >
                          <img src={data.Icon} style={{ width: "100%" }} />
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
                    {hyGem.map((data: Gem, i: number) => {
                      return (
                        <div
                          style={{
                            width: "9%",
                            textAlign: "center",
                            display: "inline-block",
                          }}
                          key={i}
                        >
                          <img src={data.Icon} style={{ width: "100%" }} />
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
                    {characterInfo?.ArmoryCard.Cards.map(
                      (data: Cards, i: number) => {
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
                            <img src={data.Icon} style={{ width: "100%" }} />
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
                          <Badge bg="secondary">{cardEffectSize}세트</Badge>
                          <Badge bg="secondary">{cardEffectCount}각</Badge>
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
                        SP {characterInfo?.ArmoryProfile.UsingSkillPoint} /{" "}
                        {characterInfo?.ArmoryProfile.TotalSkillPoint}
                      </Badge>{" "}
                      <br />
                    </Col>
                  </Row>
                  {usingSkills.length != 0 ? (
                    <>
                      <Row>
                        {usingSkills.map((data: any, i: number) => {
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
                                (tp: Tripod, j: number) => {
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
                        })}
                      </Row>
                    </>
                  ) : null}
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </>
    );
};


export default Battle;
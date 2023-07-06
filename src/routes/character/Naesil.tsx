import { useEffect, useState } from "react";
import { Card, Row, Col, Badge, Tab, Nav } from "react-bootstrap";

function Naesil({ data }: {data: CharacterInfo | undefined}) {
    let [tendencies, setTendencies] = useState<Tendencies[]>([]);
    let [equipEtc, setEquipEtc] = useState<ArmoryEquipment[]>([]);
    let [collectibles, setCollectibles] = useState<Collectibles[]>([]);
    let [collectScore, setCollectScore] = useState(0);

    function setArmoryEquipment(data: ArmoryEquipment[]) {
        let etcArr: ArmoryEquipment[] = [];

        data.map((e: ArmoryEquipment, i: number) => {
            if(e.Type == '나침반' || e.Type == '부적' || e.Type == '문장') {
                etcArr.push(e);
            }
        });

        setEquipEtc(etcArr);
    }

    function setCollectScorePercent(data: Collectibles[]) {
        let totalCollectScore = 0;
        let currCollectScore = 0;

        data.map((c: Collectibles, i: number) => {
            currCollectScore += c.Point;
            totalCollectScore += c.MaxPoint;
        });

        setCollectScore((currCollectScore / totalCollectScore) * 100);
    }

    useEffect(() => {
      if(typeof data != 'undefined') {
        setTendencies(data.ArmoryProfile.Tendencies);

        if(data.ArmoryEquipment != null) {
            setArmoryEquipment(data.ArmoryEquipment);
        }

        if(data.Collectibles != null) {
            setCollectibles(data.Collectibles);
            setCollectScorePercent(data.Collectibles);
        }
      } 
    }, []);

    return (
      <>
        <Card>
          <Row>
            <Col sm={8}>
              <Row>
                <Col>
                  {tendencies?.map((data: Tendencies, i: number) => {
                    return (
                      <div
                        key={i}
                        style={{ float: "left", paddingRight: "20px" }}
                      >
                        <p>
                          {data.Type} {data.Point}
                        </p>
                      </div>
                    );
                  })}
                </Col>
              </Row>
              <Row>
                <Col>
                  <div>생활 항목</div>
                </Col>
              </Row>
            </Col>
            <Col sm={4}>
              {equipEtc.map((data: ArmoryEquipment, i: number) => {
                return (
                  <div key={i} style={{ textAlign: "left" }}>
                    <img src={data.Icon} style={{ width: "10%" }} />
                    {data.Name}
                  </div>
                );
              })}
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              수집품 <Badge bg="secondary">{collectScore.toFixed(3)}%</Badge>
            </Col>
          </Row>
          <br />
          <Tab.Container defaultActiveKey="0">
            <Row>
              <Col sm={4}>
                <Row>
                  <Col>
                    <Nav variant="pills" className="flex-column">
                      {collectibles.map((data: Collectibles, i: number) => {
                        return (
                          <Nav.Item key={i}>
                            <Nav.Link eventKey={i}>
                              <img src={data.Icon} style={{ width: "10%" }} />
                              {data.Type}
                              <p>
                                {data.Point} / {data.MaxPoint}
                              </p>
                            </Nav.Link>
                          </Nav.Item>
                        );
                      })}
                    </Nav>
                  </Col>
                </Row>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                    {collectibles.map((data: Collectibles, i: number) => {
                        return (
                          <Tab.Pane key={i} eventKey={i}>
                            <div style={{ width: '100%', float: 'left' }}>
                              <div
                                style={{
                                  float: "left",
                                  margin: "0 auto",
                                  padding: "10px",
                                }}
                              >
                                <h5>{data.Type}</h5>
                              </div>
                              <div
                                style={{
                                  float: "right",
                                  margin: "0 auto",
                                  padding: "10px",
                                }}
                              >
                                <h5>
                                  {data.Point} / {data.MaxPoint}
                                </h5>
                              </div>
                            </div>

                            <div style={{ width: '100%', padding: '10px' }}>
                                {
                                    data?.CollectiblePoints.map((cp: CollectiblePoint, j: number) => {
                                        let badgeBg = 'secondary';

                                        if(cp.Point == cp.MaxPoint) {
                                            badgeBg = 'success';
                                        }

                                        return (
                                          <div key={j} style={{ width: '100%', marginBottom: '10px' }}>
                                            <Badge bg={badgeBg}>{j + 1}</Badge>
                                            {cp.PointName}
                                            {
                                                data.Type == '모코코 씨앗' ?
                                                <p>{cp.Point} / {cp.MaxPoint}</p>
                                                : null
                                            }
                                          </div>
                                        );
                                    })
                                }
                            </div>
                          </Tab.Pane>
                        );
                      })}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Card>
      </>
    );
}

export default Naesil;
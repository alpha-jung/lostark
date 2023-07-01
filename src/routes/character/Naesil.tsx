import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";

function Naesil({ data }: {data: any}) {
    let [tendencies, setTendencies] = useState<any[]>([]);
    let [equipEtc, setEquipEtc] = useState<any[]>([]);

    function setArmoryEquipment(data: any) {
        let etcArr: any[] = [];

        data.map((e: any, i: number) => {
            if(e.Type == '나침반' || e.Type == '부적' || e.Type == '문장') {
                etcArr.push(e);
            }
        });

        setEquipEtc(etcArr);
    }

    useEffect(() => {
        setTendencies(data.ArmoryProfile.Tendencies);

        if(data.ArmoryEquipment != null) {
            setArmoryEquipment(data.ArmoryEquipment);
        }
    }, []);

    return (
        <>
            <Card>
                <Row>
                    <Col sm={8}>
                        <Row>
                            <Col>
                                {
                                    tendencies?.map((data: any, i: number) => {
                                        return (
                                            <div key={i} style={{ float: 'left', paddingRight: '20px' }}>
                                                <p>{data.Type} {data.Point}</p>
                                            </div>
                                        )
                                    })
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div>생활 항목</div>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={4}>
                        {
                            equipEtc.map((data: any, i: number) => {
                                return (
                                    <div key={i} style={{ textAlign: 'left' }}>
                                        <img src={data.Icon} style={{ width: '10%' }}/>
                                        {data.Name}
                                    </div>
                                )
                            })
                        }
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        수집품
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={4}></Col>
                    <Col sm={8}></Col>
                </Row>
            </Card>
        </>
    )
}

export default Naesil;
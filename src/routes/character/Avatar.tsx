import { useEffect, useState } from "react";
import { Card, Row, Col, Badge, Tab, Nav } from "react-bootstrap";

function Avatar({ data }: {data: any}) {
    let [avatars, setAvatars] = useState<any[]>([]);

    function setArmoryAvatars(data: any) {
        data.map((avatar: any, i: number) => {
            if(!avatar.IsInner && avatar.Type.indexOf('얼굴') < 0 && avatar.Type.indexOf('악기') < 0) {
                let type = avatar.Type.split(' ');
                avatar.Type = type[0] + ' 덧입기 ' + type[1];
                return avatar;
            }
        });

        setAvatars(data);
    }

    useEffect(() => {
        if(data.ArmoryAvatars != null) {
            setArmoryAvatars(data.ArmoryAvatars);
        }
    }, []);

    return (
        <>
            <Card>
                <Row>
                    <Col sm={9}>
                        <img src={data.ArmoryProfile?.CharacterImage ?? ""} style={{ width: '100%' }} />
                    </Col>
                    <Col sm={3}>
                        {
                            avatars.map((data: any, i: number) => {
                                return (
                                  <div key={i} style={{ paddingBottom: '20px' }}>
                                    <div style={{ width: '20%', float: 'left'}}>
                                        <img src={data.Icon} style={{ width: '100%' }} />
                                    </div>
                                    <div style={{ width: '80%', fontSize: '5px' }}>
                                        <p>{data.Type}</p>
                                        <p>{data.Name}</p>
                                    </div>
                                  </div>
                                );
                            })
                        }
                        
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default Avatar;
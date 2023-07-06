import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";

function Avatar({ data }: {data: CharacterInfo | undefined}) {
    let [avatars, setAvatars] = useState<ArmoryAvatars[]>([]);

    function setArmoryAvatars(data: ArmoryAvatars[]) {
        data.map((avatar: ArmoryAvatars, i: number) => {
            if(!avatar.IsInner && avatar.Type.indexOf('얼굴') < 0 && avatar.Type.indexOf('악기') < 0) {
                if(avatar.Type != '') {
                    let type = avatar.Type.split(' ');
                    avatar.Type = type[0] + ' 덧입기 ' + type[1];
                    return avatar;
                } else {
                    avatar.Type = '발자국 아바타';
                    return avatar;
                }
                
            }
        });

        setAvatars(data);
    }

    useEffect(() => {
        if(typeof data != 'undefined' && data.ArmoryAvatars != null) {
            setArmoryAvatars(data.ArmoryAvatars);
        }
    }, []);

    return (
        <>
            <Card>
                <Row>
                    <Col sm={9}>
                        <img src={data?.ArmoryProfile?.CharacterImage ?? ""} style={{ width: '100%' }} />
                    </Col>
                    <Col sm={3}>
                        {
                            avatars.map((data: ArmoryAvatars, i: number) => {
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
import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";

function Characters({ data }: {data: CharacterInfo | undefined}) {
    let [characters, setCharacters] = useState<Characters[]>([]);
    let imgInfo = [
        { name: '워로드', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/warlord.png' },
        { name: '버서커', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/berserker.png' },
        { name: '디스트로이어', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/destroyer.png' },
        { name: '홀리나이트', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/holyknight.png' },
        { name: '슬레이어', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/berserker_female.png' },
        { name: '배틀마스터', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/battle_master.png' },
        { name: '인파이터', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/infighter.png' },
        { name: '기공사', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/force_master.png' },
        { name: '창술사', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/lance_master.png' },
        { name: '스트라이커', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/battle_master_male.png' },
        { name: '서머너', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/summoner.png' },
        { name: '아르카나', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/arcana.png' },
        { name: '소서리스', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/elemental_master.png' },
        { name: '바드', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/bard.png' },
        { name: '데빌헌터', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/devil_hunter.png' },
        { name: '블래스터', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/blaster.png' },
        { name: '호크아이', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/hawk_eye.png' },
        { name: '스카우터', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/scouter.png' },
        { name: '건슬링어', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/devil_hunter_female.png' },
        { name: '데모닉', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/demonic.png' },
        { name: '블레이드', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/blade.png' },
        { name: '리퍼', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/reaper.png' },
        { name: '도화가', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/yinyangshi.png' },
        { name: '기상술사', src: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/weather_artist.png' },
    ]

    useEffect(() => {
        if(typeof data != 'undefined' && data.Characters != null) {
            data.Characters.sort((a: any, b: any) => {
                let ml1 = parseInt(a.ItemMaxLevel.replace(',', ''));
                let ml2 = parseInt(b.ItemMaxLevel.replace(',', ''));

                return ml2 - ml1;
            });

            setCharacters(data.Characters);
        }
    }, []);

    return (
        <>
            <Card>
                <Row>
                    {
                        characters.map((data: any, i: number) => {
                            let imgSrc = '';

                            for(let j = 0; j < imgInfo.length; j++) {
                                if(imgInfo[j].name == data.CharacterClassName) {
                                    imgSrc = imgInfo[j].src;
                                    break;
                                }
                            }
                        
                            return (
                              <Col sm={6} key={i}>
                                <div style={{ width: "100%" }}>
                                  <div
                                    style={{ float: "left", width: "20%" }}
                                  >
                                    <img src={imgSrc} style={{ width: '100%' }} />
                                  </div>
                                  <div style={{ width: "80%" }}>
                                    <p>{data.CharacterName}</p>
                                    <div>
                                        <p style={{ float: 'left' }}>{data.CharacterClassName} | </p>
                                        <p style={{ float: 'left' }}>Lv.{data.CharacterLevel} | </p>
                                        <p>{data.ItemMaxLevel}</p>
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            );
                        })
                    }
                </Row>
            </Card>
        </>
    )
}

export default Characters;
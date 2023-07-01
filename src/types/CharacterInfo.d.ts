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
declare module 'CharacterInfo' {
    type CharacterInfo = {
        ArmoryAvatars: ArmoryAvatars[],
        ArmoryCard: {
            Cards: Cards[],
            Effects: Effects[]
        },
        ArmoryEngraving: {
            Effects: Item[],
            Engraving: Engraving[]
        },
        ArmoryEquipment: ArmoryEquipment[],
        ArmoryGem: {
            Effects: GemEffect[],
            Gems: Gem[]
        },
        ArmoryProfile: ArmoryProfile,
        ArmorySkills: ArmorySkills[],
        Collectibles: Collectibles[],
        ColosseumInfo: ColosseumInfo,
        Characters: Characters[]
    }
    
    type ArmoryAvatars = {
        Grade: string,
        Icon: string,
        IsInner: boolean,
        IsSet: boolean,
        Name: string,
        Tooltip: string,
        Type: string
    }
    
    type ArmoryCard = {
        Cards: Cards[],
        Effects: Effects[]
    }
    
    type Cards = {
        AwakeCount: number,
        AwakeTotal: number,
        Grade: string,
        Icon: string,
        Name: string,
        Slot: number,
        Tooltip: string
    }
    
    type Effects = {
        CardSlots: number[],
        Index: number,
        Items: Item[]
    }
    
    type Item = {
        Description: string,
        Name: string
    }
    
    type ArmoryEngraving = {
        Effects: Item[],
        Engravings: Engraving[]
    }
    
    type Engraving = {
        Icon: string,
        Name: string,
        Slot: number,
        Tooltip: string
    }
    
    type ArmoryEquipment = {
        Grade: string,
        Icon: string,
        Name: string,
        Tooltip: string,
        Type: string,
        Quality: number,
        Level: string,
        StoneEffect: string,
        BraceletOption: string
    }
    
    type ArmoryGem = {
        Effects: GemEffect[],
        Gems: Gem[]
    }
    
    type GemEffect = {
        Description: string,
        GemSlot: number,
        Icon: string,
        Name: string,
        Tooltip: string
    }
    
    type Gem = {
        Grade: string,
        Icon: string,
        Level: number,
        Name: string,
        Slot: number,
        Tooltip: string
    }
    
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
        Stats: Stats[],
        Tendencies: Tendencies[],
        Title: string | undefined | null,
        TotalSkillPoint: number | undefined | null,
        TownLevel: number | undefined | null,
        TownName: string  | undefined | null,
        UsingSkillPoint: number  | undefined | null
    }
    
    type Stats = {
        Tooltip: string[],
        Type: string,
        Value: string
    }
    
    type Tendencies = {
        MaxPoint: number,
        Point: number,
        Type: string
    }
    
    type ArmorySkills = {
        Icon: string,
        IsAwakening: boolean,
        Level: number,
        Name: string,
        Rune: string | null,
        Tooltip: string,
        Tripods: Tripod[],
        Type: string
    }
    
    type Tripod = {
        Icon: string,
        IsSelected: boolean,
        Level: number,
        Name: string,
        Slot: number,
        Tier: number,
        Tooltip: string
    }
    
    type Characters = {
        CharacterClassName: string,
        CharacterLevel: number,
        CharacterName: string,
        ItemAvgLevel: string,
        ItemMaxLevel: string,
        ServerName: string
    }
    
    type Collectibles = {
        CollectiblePoints: CollectiblePoint[],
        Icon: string,
        MaxPoint: number,
        Point: number,
        Type: string
    }
    
    type CollectiblePoint = {
        PointName: string,
        Point: number,
        MaxPoint: number
    }
    
    type ColosseumInfo = {
        Exp: number,
        PreRank: number,
        Rank: number
    }
    
    type Colosseum = {
        CoOpBattle: null,
        Competitive: null,
        Deathmatch: null,
        SeasonName: string,
        TeamDeathmatch: TeamDeathmatch | null,
        TeamElimination: TeamElimination | null
    }
    
    type TeamDeathmatch = {
        AceCount: number,
        DeathCount: number,
        KillCount: number,
        LoseCount: number,
        PlayCount: number,
        TieCount: number,
        VictoryCount: number
    }
    
    type TeamElimination = {
        AceCount: number,
        AllKillCount: number,
        DeathCount: number,
        FirstPlayCount: number,
        FirstWinCount: number,
        KillCount: number,
        LoseCount: number,
        PlayCount: number,
        SecondPlayCount: number,
        SecondWinCount: number,
        ThirdPlayCount: number,
        ThirdWinCount: number,
        TieCount: number,
        VictoryCount: number
    }

    export { CharacterInfo, ArmoryAvatars, ArmoryCard, Cards, Effects, Item, ArmoryEngraving, Engraving, ArmoryEquipment, ArmoryGem, GemEffect, Gem, ArmoryProfile, Stats, Tendencies, ArmorySkills, Tripod, Characters, Collectibles, CollectiblePoint, ColosseumInfo, Colosseum, TeamDeathmatch, TeamElimination }
}
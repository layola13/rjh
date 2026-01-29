interface Meta {
  magic: string;
  version: string;
  unit: string;
  keywords: string;
  customizationVersion: string;
}

interface MaterialParams {
  colorM?: string;
  sY?: number;
  tUrl?: string;
  sX?: number;
  nPs?: NormalMapParam[];
}

interface NormalMapParam {
  tUrl: string;
  tX: number;
  tY: number;
}

interface MaterialReference {
  seekId: string;
  pms: MaterialParams;
}

interface PathSegment {
  type: string;
  data: number[][];
}

interface PathStructure {
  cs: PathSegment[][];
}

interface PathExtension {
  cr: number;
}

interface PaveRegion {
  id: string;
  patId: string;
  path: PathStructure;
  ext: PathExtension;
}

interface PaveVector {
  p: number[];
}

interface TemplateMap {
  ID_BRICK_W: number;
  ID_BRICK_H: number;
  ID_BRICK_GAP: number;
}

interface Template {
  id: string;
  map: TemplateMap;
}

interface SeamMaterial {
  seekId: string;
  pms: MaterialParams;
}

interface Seam {
  width: number;
  mat: SeamMaterial;
}

interface UnitMaterial {
  seekId: string;
  pms: MaterialParams;
}

interface PatternUnit {
  id: number;
  mats: UnitMaterial[];
  sd: number;
  pct: Record<string, number>;
}

interface Pattern {
  id: string;
  type: number;
  tmpl?: Template;
  pv: PaveVector;
  seam?: Seam;
  units?: PatternUnit[];
  mat?: MaterialReference;
}

interface MixPave {
  version: string;
  regions: PaveRegion[];
  pats: Pattern[];
  bgMat: MaterialReference;
}

interface HostReference {
  faceEntity: string;
  faceId?: string;
}

interface FaceGroup {
  faceGroupId: string;
  faceGroupBoundMap: Record<string, unknown>;
}

interface DataNode {
  l: string;
  id: string;
  seekId?: string;
  textureURI?: string;
  iconSmallURI?: string;
  iconLargeURI?: string;
  colorMode?: string;
  tileSize_x?: number;
  tileSize_y?: number;
  seamColor?: number;
  mixpaint?: string;
  color?: number;
  c?: string[];
  host?: HostReference;
  faceGroup?: FaceGroup;
  p?: string[];
  mixPave?: MixPave;
}

interface MaterialData {
  meta: Meta;
  entryId: string;
  data: DataNode[];
  materials: unknown[];
  products: string[];
  productIds: string[];
  generatedProducts: unknown[];
}

interface WallFace {
  elementTypes: unknown[];
  area: number;
  matJson: MaterialData;
}

interface DefaultMaterials {
  floor: MaterialData;
  ceiling: MaterialData;
  wallFaces: WallFace[];
}

export class BalconyData {
  static getDefaultMaterials(): DefaultMaterials {
    return {
      floor: {
        meta: {
          magic: "u6tklt3u60yg",
          version: "1.9",
          unit: "meter",
          keywords: "Homestyler web designer editor",
          customizationVersion: "0.2"
        },
        entryId: "75",
        data: [
          {
            l: "Material",
            id: "75",
            seekId: "9437af46-1820-432b-b882-a1455d4d1be9",
            textureURI: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/9437af46-1820-432b-b882-a1455d4d1be9/wallfloor.jpg",
            iconSmallURI: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/9437af46-1820-432b-b882-a1455d4d1be9/resized/iso_w160_h160.jpg?type=icon",
            iconLargeURI: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/9437af46-1820-432b-b882-a1455d4d1be9/wallfloor.jpg?type=icon",
            colorMode: "texture",
            tileSize_x: 3,
            tileSize_y: 3,
            seamColor: 16777215,
            mixpaint: "687"
          },
          {
            l: "Mixpaint",
            id: "687",
            c: ["688"],
            host: {
              faceEntity: "73",
              faceId: "73"
            },
            faceGroup: {
              faceGroupId: "",
              faceGroupBoundMap: {}
            }
          },
          {
            l: "MixSketch2d",
            id: "688",
            p: ["687"],
            c: [],
            mixPave: {
              version: "3.00",
              regions: [
                {
                  id: "69",
                  patId: "70",
                  path: {
                    cs: [
                      [
                        {
                          type: "ln2",
                          data: [
                            [3.45647403072421, 0],
                            [1, 0.000222044604925031],
                            [-3.45647403072421, 0]
                          ]
                        },
                        {
                          type: "ln2",
                          data: [
                            [3.45647403072421, 6.51792245793709],
                            [0, 1],
                            [-6.51792245793709, 0]
                          ]
                        },
                        {
                          type: "ln2",
                          data: [
                            [0, 6.51792245793709],
                            [-1, -0.000555111512312578],
                            [-3.45647403072421, 0]
                          ]
                        },
                        {
                          type: "ln2",
                          data: [
                            [-0.000416974510729321, -0.000784214997703471],
                            [-0.000555111512312578, -1],
                            [-6.51792245793709, 0]
                          ]
                        }
                      ]
                    ]
                  },
                  ext: {
                    cr: 0
                  }
                }
              ],
              pats: [
                {
                  id: "70",
                  type: 1,
                  tmpl: {
                    id: "8eea3e2a-2075-4d57-9279-3af2c6967908",
                    map: {
                      ID_BRICK_W: 0.8,
                      ID_BRICK_H: 0.8,
                      ID_BRICK_GAP: 0.002
                    }
                  },
                  pv: {
                    p: [3.45647403072421, 0]
                  },
                  seam: {
                    width: 0.002,
                    mat: {
                      seekId: "16807240-b36e-4777-aca4-03ea45f7bf9c",
                      pms: {
                        colorM: "texture",
                        sY: 100
                      }
                    }
                  },
                  units: [
                    {
                      id: 0,
                      mats: [
                        {
                          seekId: "e4b077dd-fb30-49bb-a251-acad2709a49e",
                          pms: {
                            colorM: "texture"
                          }
                        }
                      ],
                      sd: 776,
                      pct: {
                        "e4b077dd-fb30-49bb-a251-acad2709a49e": 1
                      }
                    }
                  ]
                }
              ],
              bgMat: {
                seekId: "9437af46-1820-432b-b882-a1455d4d1be9",
                pms: {
                  colorM: "texture",
                  tUrl: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/9437af46-1820-432b-b882-a1455d4d1be9/wallfloor.jpg",
                  sX: 1.5,
                  nPs: [
                    {
                      tUrl: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/9437af46-1820-432b-b882-a1455d4d1be9/material-normal.png",
                      tX: 2,
                      tY: 3
                    }
                  ]
                }
              }
            }
          }
        ],
        materials: [],
        products: [
          "9437af46-1820-432b-b882-a1455d4d1be9",
          "8eea3e2a-2075-4d57-9279-3af2c6967908",
          "16807240-b36e-4777-aca4-03ea45f7bf9c",
          "e4b077dd-fb30-49bb-a251-acad2709a49e"
        ],
        productIds: [
          "9437af46-1820-432b-b882-a1455d4d1be9",
          "8eea3e2a-2075-4d57-9279-3af2c6967908",
          "16807240-b36e-4777-aca4-03ea45f7bf9c",
          "e4b077dd-fb30-49bb-a251-acad2709a49e"
        ],
        generatedProducts: []
      },
      ceiling: {
        meta: {
          magic: "u6tklt3u60yg",
          version: "1.9",
          unit: "meter",
          keywords: "Homestyler web designer editor",
          customizationVersion: "0.2"
        },
        entryId: "108",
        data: [
          {
            l: "Material",
            id: "108",
            seekId: "c53afd8f-6b30-4d1b-8454-0138ff5d7147",
            color: 16316923,
            colorMode: "color",
            seamColor: 16777215,
            mixpaint: "109"
          },
          {
            l: "Mixpaint",
            id: "109",
            c: ["110"],
            host: {
              faceEntity: "106"
            },
            faceGroup: {
              faceGroupId: "",
              faceGroupBoundMap: {}
            }
          },
          {
            l: "MixSketch2d",
            id: "110",
            p: ["109"],
            c: [],
            mixPave: {
              version: "3.00",
              regions: [
                {
                  id: "3",
                  patId: "4",
                  path: {
                    cs: [
                      [
                        {
                          type: "ln2",
                          data: [
                            [3.45647403072421, -0.000222044604925031],
                            [1, 0.000222044604925031],
                            [-3.45647403072421, 0]
                          ]
                        },
                        {
                          type: "ln2",
                          data: [
                            [3.45647403072421, 6.51792245793709],
                            [0, 1],
                            [-6.51792245793709, 0]
                          ]
                        },
                        {
                          type: "ln2",
                          data: [
                            [-0.000444089209850063, 6.51792245793709],
                            [-1, 0.000111022302462516],
                            [-3.45647403072421, 0]
                          ]
                        },
                        {
                          type: "ln2",
                          data: [
                            [-0.000416974510729321, -0.000784214997703471],
                            [0, -1],
                            [-6.51792245793709, 0]
                          ]
                        }
                      ]
                    ]
                  },
                  ext: {
                    cr: 0
                  }
                }
              ],
              pats: [
                {
                  id: "4",
                  type: 0,
                  pv: {
                    p: [0, 0]
                  },
                  mat: {
                    seekId: "c53afd8f-6b30-4d1b-8454-0138ff5d7147",
                    pms: {
                      colorM: "color"
                    }
                  }
                }
              ],
              bgMat: {
                seekId: "c53afd8f-6b30-4d1b-8454-0138ff5d7147",
                pms: {
                  colorM: "color"
                }
              }
            }
          }
        ],
        materials: [],
        products: ["c53afd8f-6b30-4d1b-8454-0138ff5d7147"],
        productIds: ["c53afd8f-6b30-4d1b-8454-0138ff5d7147"],
        generatedProducts: []
      },
      wallFaces: [
        {
          elementTypes: [],
          area: 55.85662033650327,
          matJson: {
            meta: {
              magic: "u6tklt3u60yg",
              version: "1.9",
              unit: "meter",
              keywords: "Homestyler web designer editor",
              customizationVersion: "0.2"
            },
            entryId: "342",
            data: [
              {
                l: "Material",
                id: "342",
                seekId: "c53afd8f-6b30-4d1b-8454-0138ff5d7147",
                color: 16316923,
                colorMode: "color",
                seamColor: 16777215,
                mixpaint: "689"
              },
              {
                l: "Mixpaint",
                id: "689",
                c: ["690"],
                host: {
                  faceEntity: "340",
                  faceId: "340"
                },
                faceGroup: {
                  faceGroupId: "",
                  faceGroupBoundMap: {}
                }
              },
              {
                l: "MixSketch2d",
                id: "690",
                p: ["689"],
                c: [],
                mixPave: {
                  version: "3.00",
                  regions: [
                    {
                      id: "71",
                      patId: "72",
                      path: {
                        cs: [
                          [
                            {
                              type: "ln2",
                              data: [
                                [3.45647403072421, -0.000222044604925031],
                                [1, 0.000111022302462516],
                                [-3.45647403072421, 0]
                              ]
                            },
                            {
                              type: "ln2",
                              data: [
                                [3.45647403072421, 2.8],
                                [-0.000555111512312578, 1],
                                [-2.8, 0]
                              ]
                            },
                            {
                              type: "ln2",
                              data: [
                                [-0.000444089209850063, 2.8],
                                [-1, 0],
                                [-3.45647403072421, 0]
                              ]
                            },
                            {
                              type: "ln2",
                              data: [
                                [-0.0020848725536466, -0.000392107498851736],
                                [0.000555111512312578, -1],
                                [-2.8, 0]
                              ]
                            }
                          ]
                        ]
                      },
                      ext: {
                        cr: 0
                      }
                    }
                  ],
                  pats: [
                    {
                      id: "72",
                      type: 1,
                      tmpl: {
                        id: "8eea3e2a-2075-4d57-9279-3af2c6967908",
                        map: {
                          ID_BRICK_W: 0.8,
                          ID_BRICK_H: 0.4,
                          ID_BRICK_GAP: 0.002
                        }
                      },
                      pv: {
                        p: [3.45647403072421, -2.8]
                      },
                      seam: {
                        width: 0.002,
                        mat: {
                          seekId: "16807240-b36e-4777-aca4-03ea45f7bf9c",
                          pms: {
                            colorM: "texture",
                            sY: 100
                          }
                        }
                      },
                      units: [
                        {
                          id: 0,
                          mats: [
                            {
                              seekId: "cf9d7bee-89d0-48ad-bac3-c51eb166ddd4",
                              pms: {
                                colorM: "texture"
                              }
                            }
                          ],
                          sd: 401,
                          pct: {
                            "cf9d7bee-89d0-48ad-bac3-c51eb166ddd4": 1
                          }
                        }
                      ]
                    }
                  ],
                  bgMat: {
                    seekId: "c53afd8f-6b30-4d1b-8454-0138ff5d7147",
                    pms: {
                      colorM: "color"
                    }
                  }
                }
              }
            ],
            materials: [],
            products: [
              "c53afd8f-6b30-4d1b-8454-0138ff5d7147",
              "8eea3e2a-2075-4d57-9279-3af2c6967908",
              "16807240-b36e-4777-aca4-03ea45f7bf9c",
              "cf9d7bee-89d0-48ad-bac3-c51eb166ddd4"
            ],
            productIds: [
              "c53afd8f-6b30-4d1b-8454-0138ff5d7147",
              "8eea3e2a-2075-4d57-9279-3af2c6967908",
              "16807240-b36e-4777-aca4-03ea45f7bf9c",
              "cf9d7bee-89d0-48ad-bac3-c51eb166ddd4"
            ],
            generatedProducts: []
          }
        }
      ]
    };
  }
}